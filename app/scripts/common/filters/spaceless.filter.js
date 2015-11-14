(function (angular) {

   'use strict';

   function spaceless() {
      return function (input) {
         if (input) {
            return input.replace(/[()&<>"'\/]/g, '').replace(/\s+/g, '-');
         }
      };
   }

   angular.module('lematClient.common.filters')
      .filter('spaceless', spaceless);

})(angular);