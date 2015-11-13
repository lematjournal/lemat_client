(function (angular) {

   'use strict';

   function ImagesUploadModalController($scope, $rootScope, $uibModalInstance, ImagesFactory, images) {
      var vm = this;

      vm.images = images;

      vm.setImage = function (image) {
         vm.image = image;
         toastr.info('', 'Image selected');
      };
            
      vm.uploadImage = function () {
         var image = {
            user_id: $rootScope.userId,
            image_url: vm.image
         };
         ImagesFactory.uploadImage(image).then(function () {
            toastr.success(image.image_url, 'Image uploaded');
            vm.images.push(image);
            $scope.currentIndex = vm.images.length - 1;
            vm.setImage(image);
         });
      };
      
      function findImageIndexById(id) {
         for (var i = 0; i < vm.images.length; i++) {
            if (vm.images[i].id === id) {
               return i;
            }
         }
      }

      $scope.ok = function () {
         $uibModalInstance.close(vm.image);
      };

      $scope.cancel = function () {
         $uibModalInstance.dismiss('cancel');
      };

      // carousel

      $scope.currentIndex = 0;

      $scope.setCurrentSlideIndex = function (index) {
         $scope.currentIndex = index;
      };

      $scope.isCurrentSlideIndex = function (index) {
         return $scope.currentIndex === index;
      };

      $scope.prevSlide = function () {
         --$scope.currentIndex;
         if ($scope.currentIndex === -1) {
            $scope.currentIndex = (vm.images.length - 1);
         }
      };

      $scope.nextSlide = function () {
         ++$scope.currentIndex;
         if ($scope.currentIndex > vm.images.length - 1) {
            $scope.currentIndex = 0;
         }
      };

   }

   angular.module('lematClient.admin.images')
      .controller('ImagesUploadModalController', ImagesUploadModalController);

   ImagesUploadModalController.$inject = ['$scope', '$rootScope', '$uibModalInstance', 'ImagesFactory', 'images'];

})(angular);