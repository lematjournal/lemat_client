(function (angular) {

   'use strict';

   function scrollPosition($document) {
      var directive = {
         scope: {
            scroll: '=scrollPosition'
         },
         link: link
      };

      return directive;

      function link(scope, element) {
         var windowEl = angular.element($document);
         var handler = function () {
            scope.scroll = windowEl.scrollTop();
         };
         windowEl.on('scroll', scope.$apply.bind(scope, handler));
         handler();
      }
   }

   angular.module('lematClient.common.directives')
      .directive('scrollPosition', scrollPosition);

   scrollPosition.$inject = ['$document'];

})(angular);