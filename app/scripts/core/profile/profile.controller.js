(function (angular) {

   'use strict';

   function ProfileController($scope, $rootScope, $uibModal, $location, $stateParams, AuthFactory, UsersFactory) {
      var vm = this;

      vm.master = {};

      vm.getProfile = function () {
         UsersFactory.getUser($stateParams.profile).then(function () {
            vm.user = UsersFactory.user;
         });
      };

      vm.getUserProfile = function () {
         AuthFactory.setUser().then(function () {
            $rootScope.session = AuthFactory.session;
            UsersFactory.getProfile($rootScope.session).then(function () {
               vm.user = UsersFactory.profile;
               angular.copy(vm.user, vm.master);
            });
         });
      };

      vm.upsertProfile = function (user) {
         if (AuthFactory.isAuthenticated() && !angular.equals(vm.user, vm.master)) {
            UsersFactory.upsertUser(user).then(function () {
               toastr.success('User updated successfully', 'Done');
            });
         }
      };

      vm.resetProfile = function () {
         $scope.user = $scope.master;
         toastr.info('User reset to last save', 'Done');
      };

      // profile image upload modal

      vm.openImageUploadModal = openImageUploadModal;

      function openImageUploadModal() {
         vm.$modalInstance = $uibModal.open({
            templateUrl: 'scripts/core/profile/profile.image-upload.modal/profile.image-upload.modal.html',
            controller: 'ProfileImageUploadModalController',
            controllerAs: 'profileImageUploadModalCtrl',
//            windowClass: 'app-modal-window',
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

         vm.$modalInstance.result.then(function (profileImage) {
            vm.user.profile_image = profileImage;
            vm.upsertProfile(vm.user);
         });
      }

      vm.fields = {};

      vm.save = function (event, field, user) {
         vm.fields[field] = !vm.fields[field];
         vm.upsertProfile(user);
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

   angular.module('lematClient.core.profile')
      .controller('ProfileController', ProfileController);

   ProfileController.$inject = ['$scope', '$rootScope', '$uibModal', '$location', '$stateParams', 'AuthFactory', 'UsersFactory'];

})(angular);