'use strict';

angular.module('lematClient').controller('UploadController', ['$scope', '$location', '$route', '$http', 'AuthFactory', 'AS3Factory', function ($scope, $location, $route, $http, AuthFactory, AS3Factory) {
   
   $scope.file = {};

   $scope.upload = function (file) {
      AS3Factory.getAS3keys().then(function (response) {
         var keys = response;
         AS3Factory.upload(file, keys);
      });
   };
}]);