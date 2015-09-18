'use strict';

angular.module('lematClient').controller('MainController', ['$scope', '$rootScope', '$document', '$location', '$route', '$routeParams', 'AuthFactory', function ($scope, $rootScope, $document, $location, $route, $routeParams, AuthFactory) {

	console.log($location.url())

	$scope.$on('scroll', function (event, data) {
		$scope.title = data;
	});

	$scope.$watch(function () {
		return $location.url() === '/issue-admin';
	}, function (val) {
		if (val == true && !AuthFactory.isAuthenticated()) {
			$location.path('/');
		}
	});

	$scope.$watch(function () {
		return $location.url() === '/piece-create';
	}, function (val) {
		if (val == true && !AuthFactory.isAuthenticated()) {
			$location.path('/');
		}
	});

	$scope.$watch(function () {
		return $location.url() === '/issue/:id/edit';
	}, function (val) {
		if (val == true && !AuthFactory.isAuthenticated()) {
			$location.path('/');
		}
	});

	$scope.$watch(function () {
		return $location.url() === '/issue/:id/:piece/edit';
	}, function (val) {
		if (val == true && !AuthFactory.isAuthenticated()) {
			$location.path('/');
		}
	});

	$scope.$watch(function () {
		return $location.url() === ':post/edit';
	}, function (val) {
		if (val == true && !AuthFactory.isAuthenticated()) {
			$location.path('/');
		}
	});

	$scope.$watch(function () {
		return $location.url() === '/create-post';
	}, function (val) {
		if (val == true && !AuthFactory.isAuthenticated()) {
			$location.path('/');
		}
	});

	$scope.$watch(function () {
		return $location.url() === '/online-admin';
	}, function (val) {
		if (val == true && !AuthFactory.isAuthenticated()) {
			$location.path('/');
		}
	});

	$scope.$watch(function () {
		return $location.url() === '/entry-admin';
	}, function (val) {
		if (val == true && !AuthFactory.isAuthenticated()) {
			$location.path('/');
		}
	});

	$scope.$watch(function () {
		return $location.url() === '/entry-create';
	}, function (val) {
		if (val == true && !AuthFactory.isAuthenticated()) {
			$location.path('/');
		}
	});

	$scope.$watch(function () {
		return $location.url() === '/entry-create';
	}, function (val) {
		if (val == true && !AuthFactory.isAuthenticated()) {
			$location.path('/');
		}
	});
	
	$scope.scrollShow = function () {
		return $location.url() == '/issue/1';
	};
  }]);