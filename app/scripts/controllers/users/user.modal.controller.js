(function (angular) {

   'use strict';

   angular.module('lematClient.controllers.users')
      .controller('UserModalController', UserModalController);

   UserModalController.$inject = ['$scope', '$uibModal', '$modalInstance', 'images'];

   function UserModalController($scope, $uibModal, $modalInstance, images) {
      var vm = this;

      vm.file = {};
      vm.images = images;
      vm.profileImage = '';

      $scope.ok = function () {
         $modalInstance.close(vm.profileImage);
      };

      $scope.cancel = function () {
         $modalInstance.dismiss('cancel');
      };
   }

})(angular);