(function (angular) {

   'use strict';

   function ProfileImageUploadModalController($scope, $rootScope, $uibModal, $modalInstance, ImagesFactory, images, userId) {
      var vm = this;

      vm.image = {};
      vm.images = images;
      vm.profileImage = '';

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
         $modalInstance.close(vm.profileImage);
         console.log(vm.profileImage);
      };

      $scope.cancel = function () {
         $modalInstance.dismiss('cancel');
      };
   }
   
   angular.module('lematClient.core.profile')
      .controller('ProfileImageUploadModalController', ProfileImageUploadModalController);

   ProfileImageUploadModalController.$inject = ['$scope', '$rootScope', '$uibModal', '$modalInstance', 'ImagesFactory', 'images', 'userId'];

})(angular);