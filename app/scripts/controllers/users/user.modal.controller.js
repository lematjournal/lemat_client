(function (angular) {

   'use strict';

   angular.module('lematClient.controllers.users')
      .controller('UserModalController', UserModalController);

   UserModalController.$inject = ['$scope', '$uibModal', 'images'];

   function UserModalController($scope, $uibModal, images) {
      var vm = this;
      vm.file = {};
      vm.images = images;

      $scope.openImageManager = function () {
         $scope.$modalInstance = $uibModal.open({
            scope: $scope,
            controller: 'ImageController',
            templateUrl: 'views/admin/modals/profile-image-manager.html',
            size: 'lg'
         });
      };
   }
   
})(angular);