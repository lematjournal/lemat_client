(function (angular) {

   'use strict';

   function ngEnter() {
      var directive = function (scope, element, attrs) {
         element.bind('keydown keypress', function (event) {
            if (event.which === 13) {
               scope.$apply(function () {
                  scope.$eval(attrs.ngEnter);
               });
               event.preventDefault();
            }
         });
      };
      return directive;
   }
   
   angular.module('lematClient.common.directives')
      .directive('ngEnter', ngEnter);

})(angular);