(function (angular) {

   'use strict';

   function SubmissionsController($scope, $filter, $http, $uibModal, $localStorage, $q, $rootScope, $state, $stateParams, $sessionStorage, $timeout, $window, AS3Factory, ImagesFactory, PostsFactory, SubFactory, UsersFactory, ServerUrl, JSZipUtils) {
      var vm = this;

      $scope.$storage = $localStorage;

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
         $scope.$storage.doc = vm.doc;
         $scope.$storage.images = vm.images;
      });

      /**
       * Checks to see if localstorage has a submission object.
       * If it doesn't it creates it so the below methods don't error out
       */
      function setStorage() {
         if (!$scope.$storage.submission) {
            $scope.$storage.submission = {};
            $scope.$storage.submission.attachments = [];
            $scope.$storage.doc = {};
            $scope.$storage.images = [];
         }
         vm.doc = $scope.$storage.doc;
         vm.submission = $scope.$storage.submission;
         vm.submission.attachments = $scope.$storage.submission.attachments;
         vm.images = $scope.$storage.images;
         vm.attachment = {};
      }

      setStorage();

      /**
       * Utility method to reset submission.
       */
      function resetSubmission() {
         $scope.$storage.submission = {};
         $scope.$storage.submission.attachments = [];
         $scope.$storage.doc = {};
         $scope.$storage.images = [];
         vm.doc = $scope.$storage.doc;
         vm.submission = $scope.$storage.submission;
         vm.submission.attachments = $scope.$storage.submission.attachments;
         vm.images = $scope.$storage.images;
      }
      
      /**
       * Utility method to clear all attachments by resetting local storage.
       */
      function resetAttachments() {
         $scope.$storage.submission.attachments = [];
         $scope.$storage.doc = {};
         $scope.$storage.images = [];
         vm.submission.attachments = $scope.$storage.submission.attachments;
         vm.doc = $scope.$storage.doc;
         vm.images = $scope.$storage.images;
      }
      
      $scope.$watch(function () {
         return vm.submission.submission_type;
      }, function (val, newVal) {
         if (val !== newVal && $state.current !== 'main.submissions-thank-you') {
            if (vm.submission.attachments.length > 0) {
               resetAttachments();
               toastr.info('Resetting attachments', 'Submission type changed');
            }
         }
      });
      
      /**
       * Submits video link. If there is already a link
       * it clears the attachment array and pushes the new link.
       */
      vm.submitVideo = function () {
         if (vm.submission.attachments.length === 0) {
            vm.submission.attachments.push(vm.submission.link);
         } else {
            vm.submission.attachments[0] = vm.submission.link;
         }
         toastr.info('', 'Video submitted');
      };

      /**
       * Uploads a document or image file.
       * If its a document it converts it html.
       * Note: this is dropped into the fileSelect directive
       */
      $scope.uploadFile = function () {
         toastr.success('Success', 'File Uploaded'); // todo: add error clause for fileselect directive
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
            toastr.info('', 'Generating Preview...');
            vm.convertDocxToHtml();
         }
      };

      /**
       * Takes html stored in 'vm.doc' and generates a file blob to post to Amazon S3. 
       * There is only one document attachment allowed so the method searches for any other
       * '.docx' files in the attachment array and replaces them with the new file
       */
      vm.uploadDoc = function () {
         var fileName = vm.submission.title + '-' + vm.submission.user.username + '-' + Date.now().toString() + '.docx';
         vm.convertHtmlToDocx(vm.doc, fileName).then(function (response) {
            var s3Path = response.data;
            console.log(response.data);
            if (vm.submission.attachments && $filter('filterDocs')(vm.submission.attachments).length === 0) {
               vm.submission.attachments.push(s3Path);
            } else {
               for (var i = 0; vm.submission.attachments.length > i; i++) {
                  if (!(/\.(gif|jpg|jpeg|tiff|png)$/i).test(vm.submission.attachments[i])) {
                     vm.submission.attachments[i] = s3Path;
                  }
               }
            }
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
         $scope.$storage.submission.attachments = [];
         $scope.$storage.doc = {};
         vm.doc = $scope.$storage.doc;
         vm.submission.attachments = $scope.$storage.submission.attachments;
      };

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
      vm.convertDocxToHtml = function () {
         var deferred = $q.defer();
         var params = {
            submission: {
               document: $filter('filterDocs')(vm.submission.attachments)[0]
            }
         };
         $http.post(ServerUrl + '/submissions/render-doc', params).then(function (response) {
            vm.doc = response.data;
            toastr.success('You can edit your submission in the browser.', 'Preview Generated');
            deferred.resolve(vm.doc);
         }, function (errors) {
            console.log(errors);
            deferred.reject(errors);
            toastr.info('This happens when the file format contains irregular data, we\'re working on being able to generate previews in all cases.', 'Could not generate preview');
         });
         return deferred.promise;
      };
      
      /**
       * Method to evaluate if vm.doc has been populated with a preview.
       * Called on the view to determine whether the 'preview document' div appears.
       * @returns {Boolean} true if the preview string was generated, otherwise false
       */
      vm.evaluateDoc = function () {
         return typeof vm.doc === 'string';
      };

      /**
       * Posts an Html string to the back-end to convert it to a ".docx" file
       * @param   {String} htmlString  Html string taken from vm.doc
       * @param   {String} fileName  randomly generated unique filename
       * @returns {String} Amazon S3 key of the uploaded file
       */
      vm.convertHtmlToDocx = function (htmlString, fileName) {
         var params = {
            submission: {
               document: htmlString,
               title: fileName
            }
         };

         var deferred = $q.defer();
         $http.post(ServerUrl + '/submissions/convert-doc', params).then(function (response) {
            deferred.resolve(response);
         }, function (errors) {
            deferred.reject(errors);
         });
         return deferred.promise;
      };

      /**
       * Posts submission and clears $localStorage values.
       * Redirects to 'thank you' view
       */
      vm.postSubmission = function () {
         SubFactory.upsertSubmission(vm.submission).then(function (response) {
            resetSubmission();
            $state.go('main.submissions-thank-you');
         }, function (response) {
            console.log('error: ', response);
            angular.forEach(response.data, function (obj, key) {
               if (key === 'email_content') {
                  toastr.error('Description ' + obj[0], 'Error');
               }
            });
         });
      };

      /**
       * Utility method for iterating through attachment array.
       * @param   {Number} id id of the file being searched for 
       * @returns {Object}  file if it is in the attachment array
       */
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

   SubmissionsController.$inject = ['$scope', '$filter', '$http', '$uibModal', '$localStorage', '$q', '$rootScope', '$state', '$stateParams', '$sessionStorage', '$timeout', '$window', 'AS3Factory', 'ImagesFactory', 'PostsFactory', 'SubFactory', 'UsersFactory', 'ServerUrl', 'JSZipUtils'];

})(angular);