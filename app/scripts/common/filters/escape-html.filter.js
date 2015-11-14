(function (angular) {

   'use strict';

   function escapeHtml() {
      var entityMap = {
         '&': '&amp;',
         '<': '&lt;',
         '>': '&gt;',
         '"': '&quot;',
         "'": '&#39;',
         '/': '&#x2F;'
      };

      return function (str) {
         return String(str).replace(/[&<>"'\/]/g, function (s) {
            return entityMap[s];
         });
      };
   }
   
   angular.module('lematClient.common.filters').filter('escapeHtml', escapeHtml);

})(angular);