'use strict';

angular.module('lematClient').controller('ProfileController', ['$scope', '$rootScope', '$modal', '$location', '$route', '$routeParams', 'AuthFactory', 'UserFactory', 'ProfileFactory', function ($scope, $rootScope, $modal, $location, $route, $routeParams, AuthFactory, UserFactory, ProfileFactory) {

   $scope.master = {};

   $scope.getUsers = function () {
      UserFactory.getUsers();
      $scope.users = UserFactory.users;
   };
   
   $scope.getProfile = function () {
      AuthFactory.setUser().then(function () {
         $rootScope.session = AuthFactory.session;
         ProfileFactory.getProfile($rootScope.session).then(function () {
            $scope.user = ProfileFactory.profile;
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

   $scope.resetUser = function () {
      $scope.user = $scope.master;
      toastr.info('User reset to last save', 'Done');
   };

   $scope.$on('profileImage', function (event, data) {
      $scope.setProfileImage(data); // not sure why this doesn't work
   });

   $scope.setProfileImage = function (imageUrl) {
      $scope.user.profile_image = imageUrl;
      toastr.info('Profile Image Selected', 'Selected');
   };

   // profile image upload modal

   $scope.open = function () {
      $scope.$modalInstance = $modal.open({
         scope: $scope,
         templateUrl: 'views/client/modals/image-upload.html',
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
   
   $scope.fields = {};
   
   $scope.save = function (event, field, user) {
      $scope.fields[field] = !$scope.fields[field];
      $scope.upsertUser(user);
   };
   
   $scope.reset = function (event, field) {
      if (event.keyCode == 27) {
         $scope.userForm.$rollbackViewValue();
      }
   };
}]);