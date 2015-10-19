(function (angular) {

   'use strict';

   function lematRepeat() {
      var directive = function (scope, element) {
         angular.element(element);
         if (scope.$last) {
            setTimeout(function () {
               scope.$emit('lastElem');
            }, 1);
         }
      };
      return directive;
   }
   
   angular.module('lematClient.directives')
      .directive('lematRepeat', lematRepeat);
   
})(angular);