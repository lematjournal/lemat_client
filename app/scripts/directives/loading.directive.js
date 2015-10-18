(function (angular) {

   'use strict';

   function lematLoading($http) {
      var directive = {
         restrict: 'A',
         link: link
      };

      return directive;

      function link(scope, elm) {
         scope.isLoading = function () {
            return $http.pendingRequests.length > 0;
         };

         scope.$watch(scope.isLoading, function (v) {
            if (v) {
               elm.show();
            } else {
               elm.hide();
            }
         });
      }
   }

   angular.module('lematClient.directives')
      .directive('lematLoading', lematLoading);

   lematLoading.$inject = ['$http'];

})(angular);