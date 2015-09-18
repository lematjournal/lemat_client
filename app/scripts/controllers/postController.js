'use strict';

angular.module('lematClient').controller('PostController', ['$scope', '$location', '$route', '$routeParams', 'AuthFactory', 'PostFactory', function ($scope, $location, $route, $routeParams, AuthFactory, PostFactory) {


	$scope.url = $location.absUrl();

	//	console.log($routeParams.post);

	$scope.getPost = function () {
		PostFactory.getPost($routeParams.post);
		$scope.post = PostFactory.post;
		console.log($scope.post);
	};

	$scope.getPosts = function () {
		PostFactory.getPosts();
		$scope.posts = PostFactory.posts;
		console.log("posts", PostFactory.posts);
	};

	$scope.resetPost = function () {
		angular.copy({}, $scope.post);
	};

	// crud actions

	$scope.upsertPost = function (post) {
		if (AuthFactory.isAuthenticated()) {
			PostFactory.upsertPost(post);
		}
	};

	$scope.deletePost = function (id, titleUrl) {
		if (AuthFactory.isAuthenticated()) {
			PostFactory.deletePost(id, titleUrl);
		}
	};

  }]);