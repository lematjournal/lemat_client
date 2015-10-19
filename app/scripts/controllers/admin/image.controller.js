(function (angular) {

   'use strict';

   function ImageController($scope, $q, $routeParams, AuthFactory, AS3Factory, ImageFactory) {
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
         AS3Factory.deleteFile(image.image_url).then(function () {
            ImageFactory.deleteImage(image.id).then(function () {
               vm.images.splice(findImageIndexById(image.id), 1);
            }, function () {
               console.log('error');
            });
         });
      };

      function findImageIndexById(id) {
         for (var i = 0; i < vm.images.length; i++) {
            if (vm.images[i].id === id) {
               return i;
            }
         }
      }

      // pagination

      $scope.pageChangeHandler = function () {};

      $scope.currentPage = 1;

   }
   
   angular.module('lematClient.controllers.admin')
      .controller('ImageController', ImageController);

   ImageController.$inject = ['$scope', '$q', '$routeParams', 'AuthFactory', 'AS3Factory', 'ImageFactory'];
   
})(angular);