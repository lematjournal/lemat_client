(function (angular) {

   'use strict';

   function SubmissionsController($scope, $filter, $http, $uibModal, $q, $rootScope, $stateParams, $window, AS3Factory, ImagesFactory, PostsFactory, SubFactory, UsersFactory, ServerUrl) {
      var vm = this;

      vm.submission = {
         user: {},
         attachments: [],
         created_at: Date.now()
      };

      vm.images = [];

      vm.getTags = function () {
         PostsFactory.getTags().then(function () {
            vm.tags = PostsFactory.tags;
         });
      };

      $scope.valid = false;

      vm.validate = function (form) {
         console.log('called', form);
         $scope.$watch(function () {
            return form.$invalid && !!form.errors;
         }, function (val) {
            if (val === true) {
               $scope.valid = false;
            } else {
               $scope.valid = true;
            }
            return $scope.valid;
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
         if ((/\.(gif|jpg|jpeg|tiff|png)$/i).test(vm.attachment)) {
            var image = {
               image_url: vm.attachment
            };
            ImagesFactory.uploadImage(image);
            vm.submission.attachments.push(image);
            vm.images.push(image);
         } else {
            if ($filter('filterDocs')(vm.submission.attachments).length === 0) {
               vm.submission.attachments.push(vm.attachment);
               vm.getAttachmentHtml();
            } else {
               for (var i = 0; vm.submission.attachments.length > i; i++) {
                  if (!(/\.(gif|jpg|jpeg|tiff|png)$/i).test(vm.submission.attachments[i])) {
                     vm.submission.attachments[i] = vm.attachment;
                  }
               };
               vm.getAttachmentHtml();
            }
         }
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
         vm.submission.attachments = [];
         vm.doc = {};
      };

      vm.uploadDoc = function () {
         generateBlob();
         var filename = vm.submission.title + '-' + vm.submission.user.username + '-' + Date.now() + '.docx';
         console.log(filename);
         var file = blobToFile(vm.blob, filename);
         AS3Factory.uploadFile(file, 'submissions/').then(function (response) {
            var s3Path = 'https://lematjournal.s3.amazonaws.com/' + response.params.Key;
            vm.submission.attachments.push(s3Path);
         });
      };

      function generateBlob() {
         var htmlString = vm.doc;
         var byteNumbers = new Uint8Array(htmlString.length);
         for (var i = 0; i < htmlString.length; i++) {
            byteNumbers[i] = htmlString.charCodeAt(i);
         }
         vm.blob = new Blob([byteNumbers], {
            type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
         });
      }

      function blobToFile(theBlob, fileName) {
         theBlob.lastModifiedDate = new Date();
         theBlob.name = fileName;
         return theBlob;
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
            console.log(response.data);
            vm.doc = response.data;
         }));
         return deferred.promise;
      };

      vm.postSubmission = function () {
         SubFactory.upsertSubmission(vm.submission).then(function (response) {
            console.log(response);
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

   }

   angular.module('lematClient.core.submissions')
      .controller('SubmissionsController', SubmissionsController);

   SubmissionsController.$inject = ['$scope', '$filter', '$http', '$uibModal', '$q', '$rootScope', '$stateParams', '$window', 'AS3Factory', 'ImagesFactory', 'PostsFactory', 'SubFactory', 'UsersFactory', 'ServerUrl'];

})(angular);