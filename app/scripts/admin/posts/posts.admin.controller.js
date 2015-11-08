(function (angular) {

   'use strict';

   function PostsAdminController($scope, $location, $stateParams, $uibModal, AuthFactory, UsersFactory, PostsFactory) {
      var vm = this;
      
      vm.tags = PostsFactory.tags;
      
      vm.getPost = function () {
         PostsFactory.getPost($stateParams.post).then(function () {
            vm.post = PostsFactory.post;
         });
      };

      vm.getPosts = function () {
         PostsFactory.getPosts().then(function () {
            vm.posts = PostsFactory.posts;
         });
      };

      vm.resetPost = function () {
         angular.copy({}, vm.post);
      };

      vm.getUsers = function () {
         UsersFactory.getUsers().then(function () {
            vm.users = UsersFactory.users;
         });
      };

      // crud actions

      vm.upsertPost = function (post) {
         if (AuthFactory.isAuthenticated()) {
            PostsFactory.upsertPost(post);
            toastr.success('Post updated', 'Success');
         }
      };

      vm.deletePost = function (id) {
         if (AuthFactory.isAuthenticated()) {
            PostsFactory.deletePost(id);
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
      
   }
   
   angular.module('lematClient.admin.posts')
      .controller('PostsAdminController', PostsAdminController);

   PostsAdminController.$inject = ['$scope', '$location', '$stateParams', '$uibModal', 'AuthFactory', 'UsersFactory', 'PostsFactory'];

})(angular);