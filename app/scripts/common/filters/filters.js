'use strict';

angular.module('lematClient.common.filters').filter('to_trusted', ['$sce', function ($sce) {
   return function (text) {
      return $sce.trustAsHtml(text);
   };
	}]);

angular.module('lematClient.common.filters').filter('escapeHtml', function () {
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
});

angular.module('lematClient.common.filters').filter('spaceless', function () {
   return function (input) {
      if (input) {
         return input.replace(/[()&<>"'\/]/g, '').replace(/\s+/g, '-');
      }
   };
});

angular.module('lematClient.common.filters').filter('cut', function () {
   // method signature: "item | cut:true:500"
   return function (value, wordwise, max, tail) {
      if (!value) {
         return '';
      }

      max = parseInt(max, 10);
      if (!max) {
         return value;
      }
      if (value.length <= max) {
         return value;
      }
      value = value.substr(0, max);
      if (wordwise) {
         var lastspace = value.lastIndexOf(' ');
         if (lastspace !== -1) {
            value = value.substr(0, lastspace);
         }
      }

      return value + (tail || '…');

   };
});

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

angular.module('lematClient.common.filters').filter('filterDocs', function () {
   return function (attachments) {
      var filtered = []
      angular.forEach(attachments, function (item) {
         if (!item.image_url) {
            filtered.push(item);
         }
      });
      return filtered;
   };
});

angular.module('lematClient.common.filters').filter('newlines', function () {
    return function(text) {
       if (text) {
        return text.replace(/(\r\n|\n|\r)/gm,"");
       }
    }
});