'use strict';

angular.module('lematClient').factory('PostFactory', ['$http', '$window', 'AuthFactory', 'ServerUrl', function ($http, $window, AuthFactory, ServerUrl) {
	var posts = [];
	var post = {};

	var resetPost = function () {
		angular.copy({}, post);
	};

	var getPosts = function () {
		return $http.get(ServerUrl + '/posts/').then(function (response) {
			angular.copy(response.data, posts);
		});
	};

	var getPost = function (titleUrl) {
		return $http.get(ServerUrl + '/posts/' + titleUrl).then(function (response) {
			angular.copy(response.data, post);
			console.log(post);
		});
	};

	var upsertPost = function (post) {
		var params = {
			post: {
				title: post.title,
				author: post.author,
				post_type: post.post_type,
				content: post.content,
				title_url: post.title.replace(/\s/g, "-").replace(/[`~!@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/gi, '').substring(0,25).toLowerCase()
			}
		}
		
		if (post.id) {
			return $http.patch(ServerUrl + '/posts/' + post.id, params).then(function (response) {
				console.log(response);
			});
		} else {
			return $http.post(ServerUrl + '/posts/', params).then(function (response) {
				console.log(response);
			});
		}
	};

	var deletePost = function (id, titleUrl) {
		return $http.delete(ServerUrl + '/posts/' + titleUrl).then(function () {
			posts.splice(findPostIndexById(id), 1);
		});
	};

	var findPostIndexById = function (id) {
		for (var i = 0; i < posts.length; i++) {
			if (posts[i].id === id) {
				return i;
			}
		}
	};

	return {
		getPosts: getPosts,
		getPost: getPost,
		posts: posts,
		post: post,
		upsertPost: upsertPost,
		deletePost: deletePost,
		resetPost: resetPost
	};
			}]);