(function (angular) {

   'use strict';

   angular.module('lematClient.controllers.admin')
      .controller('ImageController', ImageController);

   ImageController.$inject = ['$scope', '$q', '$routeParams', 'AuthFactory', 'ImageFactory'];

   function ImageController($scope, $q, $routeParams, AuthFactory, ImageFactory) {
      var vm = this;

      $scope.isAdmin = function () {
         return AuthFactory.isAdmin();
      };

      vm.getImages = function () {
         ImageFactory.getImages().then(function () {
            vm.images = ImageFactory.images;
         });
      };

      vm.deleteImage = function (image) {
         ImageFactory.deleteImage(image.id).then(function () {
            vm.images.splice(findImageIndexById(image.id), 1);
         });
      };

      function findImageIndexById(id) {
         for (var i = 0; i < vm.images.length; i++) {
            if (vm.images[i].id === id) {
               return i;
            }
         }
      };

      // pagination

      $scope.pageChangeHandler = function () {};

      $scope.currentPage = 1;

   }
   
})(angular);