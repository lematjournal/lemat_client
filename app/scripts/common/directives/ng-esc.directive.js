(function (angular) {

   'use strict';

   function ngEsc() {
      var directive = function (scope, element, attrs) {
         element.bind('keydown keypress', function (event) {
            if (event.which === 27) {
               scope.$apply(function () {
                  scope.$eval(attrs.ngEsc);
               });
               event.preventDefault();
            }
         });
      };
      
      return directive;
      
   }

   angular.module('lematClient.common.directives')
      .directive('ngEsc', ngEsc);

})(angular);