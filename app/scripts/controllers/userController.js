'use strict';

angular.module('lematClient').controller('UserController', ['$scope', '$location', '$route', '$routeParams', 'AuthFactory', 'UserFactory', function ($scope, $location, $route, $routeParams, AuthFactory, UserFactory) {

   $scope.getUsers = function () {
      UserFactory.getUsers();
      $scope.users = UserFactory.users;
   };

   $scope.getUser = function () {
      UserFactory.getUser($routeParams.user);
      $scope.user = UserFactory.user;
   };

   $scope.upsertUser = function (user) {
      if (user.role !== 'admin') {
         user.password = 'default';
      }

      if (AuthFactory.isAuthenticated()) {
         UserFactory.upsertUser(user);
         $location.path('/user-admin');
         $scope.getUsers();
      }
   };

   $scope.deleteUser = function (id, username) {
      if (AuthFactory.isAuthenticated()) {
         UserFactory.deleteUser(id, username);
      }
   };

   $scope.selectedUser = function ($item) {
      if ($item) {
         $scope.$emit('selectedUser', $item.originalObject);
      }
   };
   
   $scope.exclude = function (elem) {
      return !elem.role.match(/^(admin|editor)$/);
   };
}]);