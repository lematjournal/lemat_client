'use strict';

angular.module('lematClient').factory('PostFactory', ['$http', 'AuthFactory', 'ServerUrl', function ($http, AuthFactory, ServerUrl) {
    var posts = [], post = {}, tags = [];

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
   
   var getTags = function () {
        return $http.get(ServerUrl + '/tags/').then(function (response) {
           angular.copy(response.data, tags);
        });
   };

    var upsertPost = function (post) {
        var params = {
            post: {
                title: post.title,
                tag_names: post.tags,
				    user_id: post.user_id,
                content: post.content,
                title_url: post.title.replace(/\s/g, "-").substring(0, 25).toLowerCase()
            }
        };
        
        console.log(params);

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

    var findPostIndexById = function (id) {
        for (var i = 0; i < posts.length; i++) {
            if (posts[i].id === id) {
                return i;
            }
        }
    };

    var deletePost = function (id, titleUrl) {
        return $http.delete(ServerUrl + '/posts/' + titleUrl).then(function () {
            posts.splice(findPostIndexById(id), 1);
        });
    };


    return {
        getPosts: getPosts,
        getPost: getPost,
        getTags: getTags,
        posts: posts,
        post: post,
        tags: tags,
        upsertPost: upsertPost,
        deletePost: deletePost,
        resetPost: resetPost
    };
   }]);