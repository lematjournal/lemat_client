(function (angular) {

   'use strict';

   function PostsFactory($http, $localStorage, AuthFactory, ServerUrl) {
      var posts = [],
         post = {},
         tags = $localStorage.tags;

      function resetPost() {
         angular.copy({}, post);
      }

      function getPosts() {
         return $http.get(ServerUrl + '/content/posts/').then(function (response) {
            angular.copy(response.data, posts);
         });
      }

      function getPost(titleUrl) {
         return $http.get(ServerUrl + '/content/posts/' + titleUrl).then(function (response) {
            angular.copy(response.data, post);
         });
      }

      function getTags() {
         var promise = $http.get(ServerUrl + '/content/tags/').then(function (response) {
            $localStorage.tags = response.data;
            $localStorage.tagsGrabDate = Date.now();
            return tags;
         });
         
         return promise;
      }
      
      function upsertPost(post) {
         var params = {
            post: {
               title: post.title,
               tag_names: post.tags,
               user_id: post.user_id,
               content: post.content,
               post_type: post.post_type,
               preview: post.preview,
               title_url: post.title_url
            }
         };

         if (post.id) {
            return $http.patch(ServerUrl + '/content/posts/' + post.id, params).then(function (response) {
               console.log(response);
            });
         } else {
            return $http.post(ServerUrl + '/content/posts/', params).then(function (response) {
               console.log(response);
            });
         }
      }

      function findPostIndexById(id) {
         for (var i = 0; i < posts.length; i++) {
            if (posts[i].id === id) {
               return i;
            }
         }
      }

      function deletePost(id) {
         return $http.delete(ServerUrl + '/content/posts/' + id).then(function () {
            posts.splice(findPostIndexById(id), 1);
         });
      }

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
   }

   angular.module('lematClient.common.factories')
      .factory('PostsFactory', PostsFactory);

   PostsFactory.$inject = ['$http', '$localStorage', 'AuthFactory', 'ServerUrl'];

})(angular);