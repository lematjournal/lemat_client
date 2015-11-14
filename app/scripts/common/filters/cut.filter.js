(function (angular) {

   'use strict';

   function cut() {
      return function (value, wordwise, max, tail) {
         // method signature: "item | cut:true:500"
         if (!value) {
            return '';
         }

         max = parseInt(max, 10);
         if (!max) {
            return value;
         }
         if (value.length <= max) {
            return value;
         }
         value = value.substr(0, max);
         if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace !== -1) {
               value = value.substr(0, lastspace);
            }
         }

         return value + (tail || '…');

      }
   }

   angular.module('lematClient.common.filters')
      .filter('cut', cut);

})(angular);