(function (angular) {

   'use strict';

   function SubmissionsController($scope, $filter, $http, $uibModal, $localStorage, $q, $rootScope, $state, $stateParams, $sessionStorage, $timeout, $window, AS3Factory, ImagesFactory, PostsFactory, SubFactory, UsersFactory, ServerUrl, JSZipUtils, FileSaver, Blob) {
      var vm = this;

      $scope.$storage = $localStorage;

      vm.submission = $scope.$storage.submission;

      vm.submission.attachments = [];

      vm.doc = $scope.$storage.doc;

      vm.images = $scope.$storage.images;
      
      vm.tags = PostsFactory.tags;

      $scope.imagePopover = {
         templateUrl: 'image-popover.template.html'
      };

      $scope.tagPopover = {
         templateUrl: 'tag-popover.template.html'
      };

      $scope.showEdit = false;
      
      $scope.$on('refresh', function () {
         $scope.$storage.submission = vm.submission;
      })
      
      /**
       * Checks to see if localstorage has a submission object.
       * If it doesn't it creates it so the following methods don't error out
       */
      function setStorage() {
         if (!$scope.$storage.submission) {
            $scope.$storage.submission = {};
         }
      }
      
      setStorage();

      /**
       * Uploads a document or image file.
       * If its a document it converts it html.
       */
      $scope.uploadFile = function () {
         // check and see if the file is an image
         if ((/\.(gif|jpg|jpeg|tiff|png)$/i).test(vm.attachment)) {
            var image = {
               image_url: vm.attachment
            };
            ImagesFactory.uploadImage(image);
            vm.submission.attachments.push(image);
            vm.images.push(image);
            // if it isn't then check if there is a document in the attachment array
         } else {
            // if there isn't a document then push to array
            if ($filter('filterDocs')(vm.submission.attachments).length === 0) {
               vm.submission.attachments.push(vm.attachment);
               // if there is then find it in the array and replace it
            } else {
               for (var i = 0; vm.submission.attachments.length > i; i++) {
                  if (!(/\.(gif|jpg|jpeg|tiff|png)$/i).test(vm.submission.attachments[i])) {
                     vm.submission.attachments[i] = vm.attachment;
                  }
               }
            }
            vm.getAttachmentHtml();
         }
      };

      /**
       * Takes html stored in 'vm.doc' and generates a file blob to post to Amazon S3. 
       * There is only one document attachment allowed so the method searches for any other
       * '.docx' files in the attachment array and replaces them with the new file
       */
      vm.uploadDoc = function () {
         generateDocx(vm.doc).then(function (response) {
            var filename = vm.submission.title + '-' + vm.submission.user.username + '-' + Date.now() + '.docx';
            var file = blobToFile(response, filename);
            AS3Factory.uploadFile(file, 'submissions/').then(function (response) {
               var s3Path = 'https://lematjournal.s3.amazonaws.com/' + response.params.Key;
               if ($filter('filterDocs')(vm.submission.attachments).length === 0) {
                  vm.submission.attachments.push(s3Path);
               } else {
                  for (var i = 0; vm.submission.attachments.length > i; i++) {
                     if (!(/\.(gif|jpg|jpeg|tiff|png)$/i).test(vm.submission.attachments[i])) {
                        vm.submission.attachments[i] = s3Path;
                     }
                  }
               }
               vm.getAttachmentHtml();
            });
         });
      };

      /**
       * Clears all attachments, if there are images present in the attachment array
       * it will delete their corresponding Rails SQL entry. 
       * Resets dom and attachment array.
       */
      vm.clearAttachments = function () {
         for (var i = 0; vm.submission.attachments.length > i; i++) {
            if (vm.submission.attachments[i].image_url) {
               var image = vm.submission.attachments[i].image_url;
               AS3Factory.deleteFile(image);
            } else {
               var attachment = vm.submission.attachments[i];
               AS3Factory.deleteFile(attachment);
            }
         }
         $scope.showEdit = false;
         vm.submission.attachments = [];
         vm.doc = '';
      };

      /**
       * Takes a fileblob and assigns it the necessary properties so it can be
       * treated as a file (a blob is a file minus date info and a filename)
       * @param   {Object} theBlob preassembled file blob
       * @param   {Object} fileName automatically generated file name + date
       * @returns {Object} file blob that can be treatd as a file
       */
      function blobToFile(theBlob, fileName) {
         theBlob.lastModifiedDate = new Date();
         theBlob.name = fileName;
         return theBlob;
      }

      /**
       * Generates a '.docx' file from the input string
       * @param   {String} inputString
       * @returns {Object} Promise containing the file blob
       */
      function generateDocx(inputString) {
         var deferred = $q.defer();
         var out = {};
         var loadFile = function (url, callback) {
            JSZipUtils.getBinaryContent(url, callback);
         };

         loadFile('scripts/core/submissions/submissions.form/input.docx', function (err, content) {
            if (err) {
               throw e;
            };
            var doc = new Docxgen(content);
            doc.setData({
               "template": inputString
            });
            doc.render();
            out = doc.getZip().generate({
               type: 'blob'
            });
            deferred.resolve(out);
         });
         return deferred.promise;
      }

      /**
       * Takes an attachment as an argument. Checks to see if it is an image,
       * if its an image it deletes the Amazon S3 file and corresponding entry in the Rails database.
       * Since documents aren't stored, they are simply deleted from Amazon S3
       * @summary Deletes an attachment
       * @param {Object} attachment
       */
      vm.deleteFile = function (attachment) {
         if ((/\.(gif|jpg|jpeg|tiff|png)$/i).test(attachment.image_url)) {
            AS3Factory.deleteFile(attachment.image_url).then(function () {
               ImagesFactory.deleteImage(attachment.id).then(function () {
                  vm.submission.attachments.splice(findFileIndexById(attachment.id), 1);
               }, function () {
                  console.log('error');
               });
            });
         } else {
            AS3Factory.deleteFile(attachment);
         }
      };

      /**
       * Sends '.docx' attachment url to the back-end where it is retrieved and converted to html
       * @returns {Object} Promise containing a string of the converted html
       */
      vm.getAttachmentHtml = function () {
         var deferred = $q.defer();
         var link = {
            submission: {
               document: $filter('filterDocs')(vm.submission.attachments)[0]
            }
         };
         deferred.resolve($http.post(ServerUrl + '/submissions/render-doc', link).then(function (response) {
            vm.doc = response.data;
         }));
         return deferred.promise;
      };

      /**
       * Posts submission and clears $localStorage values.
       * Redirects to 'thank you' view
       */
      vm.postSubmission = function () {
         SubFactory.upsertSubmission(vm.submission).then(function (response) {
            console.log(response);
            delete $scope.$storage.doc;
            delete $scope.$storage.submission;
            $state.go('main.submissions-thank-you');
         }, function (response) {
            console.log('error: ', response);
         });
      };

      function findFileIndexById(id) {
         for (var i = 0; i < vm.submission.attachments.length; i++) {
            if (vm.submission.attachments[i].id === id) {
               return i;
            }
         }
      }

      $scope.customMenu = [
            ['bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript'],
            ['remove-format'],
            ['ordered-list', 'unordered-list', 'outdent', 'indent'],
            ['code', 'quote', 'paragraph'],
            ['link']
        ];

   }

   angular.module('lematClient.core.submissions')
      .controller('SubmissionsController', SubmissionsController);

   SubmissionsController.$inject = ['$scope', '$filter', '$http', '$uibModal', '$localStorage', '$q', '$rootScope', '$state', '$stateParams', '$sessionStorage', '$timeout', '$window', 'AS3Factory', 'ImagesFactory', 'PostsFactory', 'SubFactory', 'UsersFactory', 'ServerUrl', 'JSZipUtils', 'FileSaver', 'Blob'];

})(angular);