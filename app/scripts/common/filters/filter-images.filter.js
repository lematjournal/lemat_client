'use strict';

angular.module('lematClient.common.filters').filter('filterImages', function () {
   return function (attachments) {
      var filtered = []
      angular.forEach(attachments, function (item) {
         if (item.image_url) {
            filtered.push(item);
         }
      });
      return filtered;
   };
});