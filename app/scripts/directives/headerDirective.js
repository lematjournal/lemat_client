'use strict';

angular.module('lematClient').directive('lematHeader', [ function () {
	return {
		restrict: 'E',
		templateUrl: 'views/partials/header.html',
		scope: false
	};
}]);