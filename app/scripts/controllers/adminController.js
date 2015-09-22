'use strict';

angular.module('lematClient').controller('AdminController', ['$scope', '$location', '$route', 'AuthFactory', function ($scope, $location, $route, AuthFactory) {
   $scope.postCredentials = function (credentials) {
      AuthFactory.login(credentials);
      $location.path('/');
      $route.reload();
   };
}]);