'use strict';

angular.module('lematClient').directive('scrollPosition', ['$window', '$document', function ($window, $document) {
	return {
		scope: {
			scroll: '=scrollPosition'
		},
		link: function (scope, element, attrs) {
			var windowEl = angular.element($window);
			var handler = function () {
				scope.scroll = windowEl.scrollTop();
			}
			windowEl.on('scroll', scope.$apply.bind(scope, handler));
			handler();
		}
	};
}]);

angular.module('lematClient').directive('lematRepeat', [function () {
	return function (scope, element, attrs) {
		angular.element(element);
		if (scope.$last) setTimeout(function () {
			scope.$emit('lastElem');
		}, 1);
	}
}]);

angular.module('lematClient').directive('scroll', ['$document', '$timeout', '$filter', function ($document, $timeout, $filter) {
	return {
		scope: false,
		controller: 'IssueController',
		link: function (scope, element, attrs) {
			var posArray = [];

			// grabs selectors after dom is loaded

			scope.$on('lastElem', function (event) {
				angular.forEach(scope.issue.pieces, function (object) {
					var selector = "#" + object.title_url.toString();
					var el = document.querySelector(selector);
					//					console.log(el);
					var top = el.getBoundingClientRect().top;
					//					console.log(top);
					posArray.push({
						title: object.title,
						pos: top
					});
				});

				// makes sure order is preserved

				posArray.sort(function (a, b) {
					return parseFloat(a.pos - b.pos);
				})
			});

			var i = 0;

			$document.on('scroll', function () {
				try {
					if ($document.scrollTop() > posArray[0]["pos"] || $document.scrollTop() === 0) {
						scope.title = '';
					}
				} catch (e) {
					// do nothing
				}

				try {
					if ($document.scrollTop() > posArray[i]["pos"] && $document.scrollTop() > 477) {
						scope.title = posArray[i]["title"];
					}
				} catch (e) {
					// do nothing
				}

				try {
					if ($document.scrollTop() > posArray[i + 1]["pos"]) {
						i++;
					}
				} catch (e) {
					// do nothing
				}
				
				try {
					if ($document.scrollTop() < posArray[i]["pos"] && $document.scrollTop() > 477) {
						i--;
					}
				} catch (e) {
					// do nothing
				}

				scope.$emit('scroll', scope.title.toUpperCase());
			});
		}
	}
}]);