(function (angular) {

   'use strict';

   function IssueModalAdminController($scope, $rootScope, $modalInstance, ImageFactory) {
      var vm = this;
      
      vm.getImages = function () {
         ImageFactory.getImages().then(function () {
            vm.images = ImageFactory.images;
         });
      };

      vm.setIssueImage = function (imageUrl) {
         vm.image_url = imageUrl;
         toastr.info('Issue cover image selected', 'Selected');
      };

      vm.uploadImage = function () {
         var image = {
            user_id: $rootScope.userId,
            image_url: vm.issue.image_url
         };
         ImageFactory.uploadImage(image).then(function () {
            ImageFactory.getImages();
         });
      };

      $scope.ok = function () {
         $modalInstance.close(vm.image_url);
      };

      $scope.cancel = function () {
         $modalInstance.dismiss('cancel');
      };
   }
   
   angular.module('lematClient.controllers.issues')
      .controller('IssueModalAdminController', IssueModalAdminController);

   IssueModalAdminController.$inject = ['$scope', '$rootScope', '$modalInstance', 'ImageFactory'];

})(angular);