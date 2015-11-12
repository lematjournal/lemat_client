(function (angular) {

   'use strict';

   function ImagesUploadModalController($scope, $rootScope, $uibModalInstance, images) {
      var vm = this;
      
      vm.images = images;
      
      vm.setImage = function (image) {
         vm.image = image;
      };
            
      $scope.ok = function () {
         $uibModalInstance.close(vm.image);
      };

      $scope.cancel = function () {
         $uibModalInstance.dismiss('cancel');
      };
      
      // pagination

      $scope.pageChangeHandler = function () {};

      $scope.currentPage = 1;

   }

   angular.module('lematClient.admin.images')
      .controller('ImagesUploadModalController', ImagesUploadModalController);

   ImagesUploadModalController.$inject = ['$scope', '$rootScope', '$uibModalInstance', 'images'];

})(angular);