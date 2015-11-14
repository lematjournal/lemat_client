(function (angular) {

   'use strict';

   function filterDocs() {
      return function (attachments) {
         var filtered = [];
         angular.forEach(attachments, function (item) {
            if (!item.image_url) {
               filtered.push(item);
            }
         });
         return filtered;
      };
   }

   angular.module('lematClient.common.filters')
      .filter('filterDocs', filterDocs);

})(angular);