(function (angular) {

   'use strict';

   function lematHeader() {
      var directive = {
         restrict: 'E',
         templateUrl: 'views/core/partials/header.html',
         controller: 'MainController',
         scope: false
      };
      return directive;
   }

   angular.module('lematClient.directives')
      .directive('lematHeader', lematHeader);

})(angular);