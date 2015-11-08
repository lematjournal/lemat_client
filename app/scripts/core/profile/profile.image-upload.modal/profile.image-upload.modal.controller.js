(function (angular) {

   'use strict';

   function ProfileImageUploadModalController($scope, $rootScope, $uibModal, $uibModalInstance, ImagesFactory, images, userId) {
      var vm = this;

      vm.images = images;
      vm.profileImage = '';
      
      vm.setProfileImage = function (imageUrl) {
         vm.profileImage = imageUrl;
         toastr.info(imageUrl, 'Issue cover image selected');
      };
      
      vm.uploadImage = function () {
         var image = {
            user_id: userId,
            image_url: vm.profileImage
         };
         ImagesFactory.uploadImage(image);
         angular.copy(image, vm.image);
         vm.images.push(image);
      };

      $scope.ok = function () {
         $uibModalInstance.close(vm.profileImage);
      };

      $scope.cancel = function () {
         $uibModalInstance.dismiss('cancel');
      };
      
      // pagination

      $scope.pageChangeHandler = function () {};

      $scope.currentPage = 1;

   }
   
   angular.module('lematClient.core.profile')
      .controller('ProfileImageUploadModalController', ProfileImageUploadModalController);

   ProfileImageUploadModalController.$inject = ['$scope', '$rootScope', '$uibModal', '$uibModalInstance', 'ImagesFactory', 'images', 'userId'];

})(angular);