(function (angular) {

   'use strict';

   angular.module('lematClient.controllers.users')
      .controller('UserController', UserController);

   UserController.$inject = ['$scope', '$rootScope', '$uibModal', '$location', '$route', '$routeParams', 'AuthFactory', 'UserFactory'];

   function UserController($scope, $rootScope, $uibModal, $location, $route, $routeParams, AuthFactory, UserFactory) {

      $scope.master = {};

      $scope.getUsers = function () {
         UserFactory.getUsers().then(function () {
            $scope.users = UserFactory.users;
         });
      };

      $scope.getUser = function () {
         UserFactory.getUser($routeParams.user).then(function () {
            $scope.user = UserFactory.user;
            angular.copy($scope.user, $scope.master);
         });
      };

      $scope.getProfile = function () {
         AuthFactory.setUser().then(function () {
            $rootScope.session = AuthFactory.session;
            UserFactory.getProfile($rootScope.session).then(function () {
               $scope.user = UserFactory.profile;
               angular.copy($scope.user, $scope.master);
            });
         });
      };

      $scope.upsertUser = function (user) {
         if (AuthFactory.isAuthenticated() && !angular.equals($scope.user, $scope.master)) {
            UserFactory.upsertUser(user).then(function () {
               toastr.success('User updated successfully', 'Done');
            });
         }
      };

      $scope.deleteUser = function (id, username) {
         if (AuthFactory.isAuthenticated()) {
            UserFactory.deleteUser(id, username);
         }
      };

      $scope.resetUser = function () {
         $scope.user = $scope.master;
         toastr.info('User reset to last save', 'Done');
      };

      $scope.selectedUser = function ($item) {
         if ($item) {
            $scope.$emit('selectedUser', $item.originalObject);
         }
      };

      $scope.$on('profileImage', function (event, data) {
         $scope.setProfileImage(data); // not sure why this doesn't work
      });

      $scope.setProfileImage = function (imageUrl) {
         $scope.user.profile_image = imageUrl;
         toastr.info('Profile Image Selected', 'Selected');
      };

      $scope.exclude = function (elem) {
         return !elem.role.match(/^(admin|editor)$/);
      };

      // controls which buttons are highlighted
      // might want to move these to a directive

      $scope.select = function (event) {
         if (!angular.element(event.target).hasClass('active')) {
            angular.element(event.target).addClass('active');
         } else {
            angular.element(event.target).removeClass('active');
         }
         angular.element(event.target).siblings().removeClass('active');
      };

      // profile image upload modal

      $scope.open = function () {
         $scope.$modalInstance = $uibModal.open({
            scope: $scope,
            templateUrl: 'views/admin/modals/profile-image-upload.html',
            controller: 'UserModalController',
            windowClass: 'app-modal-window',
            size: 'lg'
         });
      };

      $scope.ok = function () {
         $scope.$modalInstance.close();
      };

      $scope.cancel = function () {
         $scope.$modalInstance.dismiss('cancel');
      };

      // note: the client view has a slightly different organization
      // but uses too many of the same methods to justify a seperate controller
      // these are therefore necessary

      $scope.fields = {};

      $scope.save = function (event, field, user) {
         $scope.fields[field] = !$scope.fields[field];
         $scope.upsertUser(user);
      };

      $scope.reset = function (event) {
         if (event.keyCode === 27) {
            $scope.userForm.$rollbackViewValue();
         }
      };

      $scope.popover = {
         templateUrl: 'popoverTemplate.html',
      };
   }

})(angular);