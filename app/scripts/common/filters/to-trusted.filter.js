(function (angular) {

   'use strict';


   function to_trusted($sce) {
      return function (text) {
         return $sce.trustAsHtml(text);
      };
   }
   
   angular.module('lematClient.common.filters').filter('to_trusted', to_trusted);
   
   to_trusted.$inject = ['$sce'];
   
})(angular);