'use strict';

angular.module('lematClient').controller('UserController', ['$scope', '$rootScope', '$modal', '$location', '$route', '$routeParams', 'AuthFactory', 'UserFactory', function ($scope, $rootScope, $modal, $location, $route, $routeParams, AuthFactory, UserFactory) {

   $scope.master = {};

   $scope.getUsers = function () {
      UserFactory.getUsers();
      $scope.users = UserFactory.users;
   };

   $scope.getUser = function () {
      UserFactory.getUser($routeParams.user).then(function () {
         $scope.user = UserFactory.user;
         angular.copy($scope.user, $scope.master);
      });
   };

   $scope.upsertUser = function (user) {
      if (AuthFactory.isAuthenticated()) {
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
      $scope.user.profileImage = imageUrl;
      toastr.info('Profile Image Selected', 'Selected');
   };
   
   $scope.exclude = function (elem) {
      return !elem.role.match(/^(admin|editor)$/);
   };

   // profile image upload modal

   $scope.open = function () {
      $scope.$modalInstance = $modal.open({
         scope: $scope,
         templateUrl: 'views/modals/image-upload.html',
         controller: 'UploadController',
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
   
   // controls which buttons are highlighted

   $scope.select = function (event) {
      if (!angular.element(event.target).hasClass('active')) {
         angular.element(event.target).addClass('active');
      } else {
         angular.element(event.target).removeClass('active');
      }
      angular.element(event.target).siblings().removeClass('active');
   }
}]);