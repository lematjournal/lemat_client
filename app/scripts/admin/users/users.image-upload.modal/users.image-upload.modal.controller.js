(function (angular) {

   'use strict';

   function UsersImageUploadModalController($scope, $rootScope, $uibModal, $modalInstance, ImagesFactory, images, userId) {
      var vm = this;

      vm.image = {};
      vm.images = images;
      vm.profileImage = '';
      console.log(images);

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
      };

      $scope.cancel = function () {
         $modalInstance.dismiss('cancel');
      };
      
   }
   
   angular.module('lematClient.admin.users')
      .controller('UsersImageUploadModalController', UsersImageUploadModalController);

   UsersImageUploadModalController.$inject = ['$scope', '$rootScope', '$uibModal', '$modalInstance', 'ImagesFactory', 'images', 'userId'];

})(angular);