(function (angular) {

   'use strict';

   function newLines() {
      return function (text) {
         if (text) {
            return text.replace(/(\r\n|\n|\r)/gm, "");
         }
      }
   }

   angular.module('lematClient.common.filters')
      .filter('newlines', newLines);
   
})(angular);