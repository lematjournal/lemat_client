(function (angular) {

   'use strict';

   function ImagesController($scope, $q, AuthFactory, AS3Factory, ImagesFactory) {
      var vm = this;

      $scope.isAdmin = function () {
         return AuthFactory.isAdmin();
      };

      vm.getImages = function () {
         ImagesFactory.getImages().then(function () {
            vm.images = ImagesFactory.images;
         });
      };

      vm.deleteImage = function (image) {
         AS3Factory.deleteFile(image.image_url).then(function () {
            ImagesFactory.deleteImage(image.id).then(function () {
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
   
   angular.module('lematClient.admin.images')
      .controller('ImagesController', ImagesController);

   ImagesController.$inject = ['$scope', '$q', 'AuthFactory', 'AS3Factory', 'ImagesFactory'];
   
})(angular);