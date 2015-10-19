(function (angular) {

   'use strict';

   function UserController($scope, $rootScope, $uibModal, $location, $route, $routeParams, AuthFactory, UserFactory) {
      var vm = this;
      vm.master = {};

      vm.getUsers = function () {
         UserFactory.getUsers().then(function () {
            vm.users = UserFactory.users;
         });
      };

      vm.getUser = function () {
         UserFactory.getUser($routeParams.user).then(function () {
            vm.user = UserFactory.user;
            angular.copy(vm.user, vm.master);
         });
      };

      vm.getProfile = function () {
         AuthFactory.setUser().then(function () {
            $rootScope.session = AuthFactory.session;
            UserFactory.getProfile($rootScope.session).then(function () {
               vm.user = UserFactory.profile;
               angular.copy(vm.user, vm.master);
            });
         });
      };

      vm.upsertUser = function (user) {
         if (AuthFactory.isAuthenticated() && !angular.equals(vm.user, vm.master)) {
            UserFactory.upsertUser(user).then(function () {
               toastr.success('User updated successfully', 'Done');
            });
         }
      };

      vm.deleteUser = function (id, username) {
         if (AuthFactory.isAuthenticated()) {
            UserFactory.deleteUser(id, username);
         }
      };

      vm.resetUser = function () {
         $scope.user = $scope.master;
         toastr.info('User reset to last save', 'Done');
      };

      $scope.selectedUser = function ($item) {
         if ($item) {
            $scope.$emit('selectedUser', $item.originalObject);
         }
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

      vm.openImageUploadModal = openImageUploadModal;

      function openImageUploadModal() {
         $scope.$modalInstance = $uibModal.open({
            templateUrl: 'views/admin/modals/profile-image-upload.html',
            controller: 'UserModalController',
            controllerAs: 'vm',
            windowClass: 'app-modal-window',
            size: 'lg',
            resolve: {
               images: function () {
                  return vm.user.images;
               },
               userId: function () {
                  return vm.user.id;
               }
            }
         });

         $scope.$modalInstance.result.then(function (profileImage) {
            vm.user.profile_image = profileImage;
            vm.upsertUser(vm.user);
         });
      }

      // note: the client view has a slightly different organization
      // but uses too many of the same methods to justify a seperate controller
      // these are therefore necessary

      vm.fields = {};

      vm.save = function (event, field, user) {
         vm.fields[field] = !vm.fields[field];
         vm.upsertUser(user);
         toastr.success('User updated successfully', 'Done');
      };

      vm.reset = function (event) {
         if (event.keyCode === 27) {
            vm.userForm.$rollbackViewValue();
         }
      };

      $scope.popover = {
         templateUrl: 'popoverTemplate.html',
      };
   }
   
   angular.module('lematClient.controllers.users')
      .controller('UserController', UserController);

   UserController.$inject = ['$scope', '$rootScope', '$uibModal', '$location', '$route', '$routeParams', 'AuthFactory', 'UserFactory'];

})(angular);