'use strict';

angular.module('lematClient.filters').filter('to_trusted', ['$sce', function ($sce) {
	return function (text) {
		return $sce.trustAsHtml(text);
	};
	}]);

angular.module('lematClient.filters').filter('escapeHtml', function () {
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

angular.module('lematClient.filters').filter('spaceless',function() {
    return function(input) {
        if (input) {
            return input.replace(/[()&<>"'\/]/g, '').replace(/\s+/g, '-');
        }
    };
});

angular.module('lematClient.filters').filter('cut', function () {
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
