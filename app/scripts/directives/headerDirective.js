'use strict';

angular.module('lematClient').directive('lematHeader', [ function () {
	return {
		restrict: 'E',
		templateUrl: 'views/partials/header.html',
      controller: 'MainController',
		scope: true
	};
}]);