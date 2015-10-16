(function (angular) {

   'use strict';

   angular.module('lematClient.controllers.posts')
      .controller('PostAdminController', PostAdminController);

   PostAdminController.$inject = ['$scope', '$location', '$route', '$routeParams', '$uibModal', 'AuthFactory', 'UserFactory', 'PostFactory'];

   function PostAdminController($scope, $location, $route, $routeParams, $uibModal, AuthFactory, UserFactory, PostFactory) {
      var vm = this;
      vm.post = {};

      vm.getPost = function () {
         PostFactory.getPost($routeParams.post);
         vm.post = PostFactory.post;
      };

      vm.getPosts = function () {
         PostFactory.getPosts();
         vm.posts = PostFactory.posts;
      };

      vm.resetPost = function () {
         angular.copy({}, vm.post);
      };

      vm.getUsers = function () {
         UserFactory.getUsers();
         vm.users = UserFactory.users;
      };

      // crud actions

      vm.upsertPost = function (post) {
         if (AuthFactory.isAuthenticated()) {
            PostFactory.upsertPost(post);
         }
      };

      vm.deletePost = function (id, titleUrl) {
         if (AuthFactory.isAuthenticated()) {
            PostFactory.deletePost(id, titleUrl);
         }
      };

      // user create modal for posts

      $scope.open = function () {
         $scope.$modalInstance = $uibModal.open({
            scope: $scope,
            templateUrl: 'views/admin/modals/user-create.html',
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
         console.log(data);
         $scope.post.user_id = data.id;
      });

      // filters for online view

      $scope.$on('filter', function (event, data) {
         $scope.filters = data;
         $location.path('/online');
      });

      // tags

      vm.getTags = function () {
         PostFactory.getTags();
         vm.tags = PostFactory.tags;
      };
   }
   
})(angular);