(function (angular) {

   'use strict';

   function SubmissionsController($scope, $filter, $http, $uibModal, $localStorage, $q, $rootScope, $state, $stateParams, $sessionStorage, $timeout, $window, AS3Factory, ImagesFactory, PostsFactory, SubFactory, UsersFactory, ServerUrl, JSZipUtils, FileSaver, Blob) {
      var vm = this;

      $scope.$storage = $localStorage;

      vm.submission = $scope.$storage.submission;

      vm.doc = $scope.$storage.doc;

      vm.images = $scope.$storage.images;

      vm.getTags = function () {
         PostsFactory.getTags().then(function () {
            vm.tags = PostsFactory.tags;
         });
      };

      $scope.imagePopover = {
         templateUrl: 'image-popover.template.html'
      };

      $scope.tagPopover = {
         templateUrl: 'tag-popover.template.html'
      };

      $scope.showEdit = false;

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

      function blobToFile(theBlob, fileName) {
         theBlob.lastModifiedDate = new Date();
         theBlob.name = fileName;
         return theBlob;
      }

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

      vm.postSubmission = function () {
         SubFactory.upsertSubmission(vm.submission).then(function (response) {
            console.log(response);
            delete $scope.$storage.doc;
            delete $scope.$storage.submission;
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