(function (angular) {

   'use strict';

   function PostAdminController($scope, $location, $route, $routeParams, $uibModal, AuthFactory, UserFactory, PostFactory) {
      var vm = this;

      vm.post = {};

      vm.getPost = function () {
         PostFactory.getPost($routeParams.post).then(function () {
            vm.post = PostFactory.post;
         });
      };

      vm.getPosts = function () {
         PostFactory.getPosts().then(function () {
            vm.posts = PostFactory.posts;
         });
      };

      vm.resetPost = function () {
         angular.copy({}, vm.post);
      };

      vm.getUsers = function () {
         UserFactory.getUsers().then(function () {
            vm.users = UserFactory.users;
         });
      };

      // crud actions

      vm.upsertPost = function (post) {
         if (AuthFactory.isAuthenticated()) {
            PostFactory.upsertPost(post);
            $location.path('/admin/posts');
            $route.reload();
         }
      };

      vm.deletePost = function (id) {
         if (AuthFactory.isAuthenticated()) {
            PostFactory.deletePost(id);
            vm.posts.splice(findPostById(id), 1);
         }
      };

      function findPostById(id) {
         for (var i = 0; i < vm.posts.length; i++) {
            if (vm.posts[i].id === id) {
               return vm.posts[i].id;
            }
         }
      }

      // user create modal for posts

      $scope.openUserModal = function () {
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
         vm.post.user_id = data.id;
      });

      // tags

      vm.getTags = function () {
         PostFactory.getTags().then(function () {
            vm.tags = PostFactory.tags;
         });
      };
   }
   
   angular.module('lematClient.controllers.posts')
      .controller('PostAdminController', PostAdminController);

   PostAdminController.$inject = ['$scope', '$location', '$route', '$routeParams', '$uibModal', 'AuthFactory', 'UserFactory', 'PostFactory'];

})(angular);