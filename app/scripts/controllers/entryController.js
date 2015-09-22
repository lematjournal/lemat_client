'use strict';

angular.module('lematClient').controller('EntryController', ['$scope', '$rootScope', '$route', '$routeParams', '$location', '$document', 'AuthFactory', 'EntryFactory', 'ServerUrl', function ($scope, $rootScope, $route, $routeParams, $location, $document, AuthFactory, EntryFactory, ServerUrl) {

	$scope.getEntries = function () {
		EntryFactory.getEntries();
		$scope.entries = EntryFactory.entries;
	};

	$scope.getEntry = function () {
		EntryFactory.getEntry($routeParams.id);
		$scope.entry = EntryFactory.entry;
	};

	// entry crud actions

	$scope.upsertEntry = function (entry) {
		if (AuthFactory.isAuthenticated()) {
			EntryFactory.upsertEntry(entry);
		}
	};

	$scope.deleteIssue = function (id) {
		if (AuthFactory.isAuthenticated()) {
			EntryFactory.deletePost(id);
		}
	};

	// pagination

	$scope.pageChangeHandler = function (num) {
		console.log('going to page ' + num);
	};
	
	$scope.currentPage = 1;

}]);