'use strict';

angular.module('lematClient').controller('PostController', ['$scope', '$location', '$route', '$routeParams', '$modal', 'AuthFactory', 'UserFactory', 'PostFactory', function ($scope, $location, $route, $routeParams, $modal, AuthFactory, UserFactory, PostFactory) {

   $scope.url = $location.absUrl();

   $scope.getPost = function () {
      PostFactory.getPost($routeParams.post);
      $scope.post = PostFactory.post;
   };

   $scope.getPosts = function () {
      PostFactory.getPosts();
      $scope.posts = PostFactory.posts;
   };

   $scope.resetPost = function () {
      angular.copy({}, $scope.post);
   };

   $scope.getUsers = function () {
      UserFactory.getUsers();
      $scope.users = UserFactory.users;
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

   // user create modal for pieces

   $scope.open = function (size) {
      $scope.$modalInstance = $modal.open({
         scope: $scope,
         templateUrl: 'views/modals/user-create.html',
         controller: 'UserController',
         size: 'lg'
      });
   };

   $scope.ok = function () {
      $scope.$modalInstance.close();
   };

   $scope.cancel = function () {
      $scope.$modalInstance.dismiss('cancel');
   };

   $scope.$on('selectedUser', function (event, data) {
      $scope.post.user_id = data;
   });
  }]);