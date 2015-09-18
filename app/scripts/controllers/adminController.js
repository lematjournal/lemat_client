'use strict';

angular.module('lematClient').controller('AdminController', ['$scope', '$location', '$route', 'AuthFactory', function ($scope, $location, $route, AuthFactory) {

	$scope.credentials = {};

	$scope.postCredentials = function (credentials) {
		console.log("clicked");
		AuthFactory.login(credentials).then(function (response) {
			console.log("user id: ", response.data.id);
			$location.path('/');
			$route.reload();
		});
	};
}]);