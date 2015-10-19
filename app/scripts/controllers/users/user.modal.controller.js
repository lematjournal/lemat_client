(function (angular) {

   'use strict';

   function UserModalController($scope, $rootScope, $uibModal, $modalInstance, ImageFactory, images, userId) {
      var vm = this;

      vm.image = {};
      vm.images = images;
      vm.profileImage = '';

      vm.uploadImage = function () {
         var image = {
            user_id: userId,
            image_url: vm.profileImage
         };
         ImageFactory.uploadImage(image);
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
   
   angular.module('lematClient.controllers.users')
      .controller('UserModalController', UserModalController);

   UserModalController.$inject = ['$scope', '$rootScope', '$uibModal', '$modalInstance', 'ImageFactory', 'images', 'userId'];

})(angular);