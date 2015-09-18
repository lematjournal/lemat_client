'use strict';

angular.module('lematClient').controller('IssueController', ['$scope', '$rootScope', '$route', '$routeParams', '$location', '$document', '$http', 'AuthFactory', 'IssueFactory', 'ServerUrl', function ($scope, $rootScope, $route, $routeParams, $location, $document, $http, AuthFactory, IssueFactory, ServerUrl) {

	$scope.piece = {};
	$scope.issue = {};

	$scope.getIssues = function () {
		IssueFactory.getIssues();
		$scope.issues = IssueFactory.issues;
	};

	$scope.getIssue = function () {
		IssueFactory.getIssue($routeParams.id);
		$scope.issue = IssueFactory.issue;
	};

	$scope.getPieces = function () {
		IssueFactory.getIssue($routeParams.id);
		$scope.pieces = IssueFactory.pieces;
	};

	$scope.getPiece = function () {
		IssueFactory.getIssuePiece($routeParams.id, $routeParams.piece);
		$scope.piece = IssueFactory.piece;
	};

	// issue crud actions

	$scope.upsertIssue = function (issue) {
		if (AuthFactory.isAuthenticated()) {
			IssueFactory.upsertIssue(issue);
		}
	};

	$scope.deleteIssue = function (id, titleUrl) {
		if (AuthFactory.isAuthenticated()) {
			IssueFactory.deletePost(id, titleUrl);
		}
	};

	// piece crud actions

	$scope.upsertPiece = function (piece) {
		if (AuthFactory.isAuthenticated()) {
			if ($location.url() === '/piece-create') {
				IssueFactory.upsertIssuePiece(piece, piece.issue_id).then(function (response) {
					console.log(response);
				});
				//				$location.path('issue-admin');
				$scope.getIssues();
			} else {
				IssueFactory.upsertIssuePiece(piece, $routeParams.id);
				$scope.getIssue($routeParams.id);
				//				$location.path('issue-admin');
				$scope.getIssues();
			}
		}
	};

	$scope.deletePiece = function () {
		if (AuthFactory.isAuthenticated()) {
			console.log($scope.piece);
			IssueFactory.deleteIssuePiece($scope.piece);
			$location.path('issue/' + $routeParams.id);
			$scope.getIssue($routeParams.id);
		}
	};

	$scope.updatePieces = function () {
		angular.forEach($scope.issue.pieces, function (obj) {
			console.log("piece " + obj.title + " " + obj.order);
			$scope.upsertPiece(obj);
		});
	}

	$scope.title = '';
	$scope.author = {};

	$scope.scrollToTop = function () {
		$document.scrollTopAnimated(0);
	};
}]);