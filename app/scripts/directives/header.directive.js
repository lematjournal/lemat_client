'use strict';

angular.module('lematClient').directive('lematHeader', [function () {
   return {
      restrict: 'E',
      templateUrl: 'views/core/partials/header.html',
      controller: 'MainController',
      scope: false
   };
}]);