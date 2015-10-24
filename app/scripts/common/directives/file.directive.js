(function (angular) {

   'use strict';

   function file() {
      var directive = {
         restrict: 'AE',
         scope: {
            file: '@'
         },
         link: link
      };

      return directive;

      function link(scope, element) {
         element.bind('change', function (event) {
            var files = event.target.files;
            var file = files[0];
            scope.file = file;
            scope.$parent.file = file;
            scope.$apply();
         });
      }
   }

   angular.module('lematClient.common.directives')
      .directive('file', file);


})(angular);