// needs to be split between admin and client

(function (angular) {

   'use strict';

   function UsersController($scope, $rootScope, $uibModal, $location, $stateParams, AuthFactory, ImagesFactory, UsersFactory) {
      var vm = this;
      
      vm.master = {};
      
      function initialize() {
         if (!UsersFactory.users || UsersFactory.users.length === 0) {
            UsersFactory.getUsers().then(function () {
               vm.users = UsersFactory.users;
            });
         } else {
            vm.users = UsersFactory.users;
         }
      }
      
      initialize();

      vm.getUser = function () {
         UsersFactory.getUser($stateParams.user).then(function () {
            vm.user = UsersFactory.user;
            angular.copy(vm.user, vm.master);
         });
      };

      vm.getProfile = function () {
         AuthFactory.setUser().then(function () {
            $rootScope.session = AuthFactory.session;
            UsersFactory.getProfile($rootScope.session).then(function () {
               vm.user = UsersFactory.profile;
               angular.copy(vm.user, vm.master);
            });
         });
      };

      vm.upsertUser = function () {
         if (AuthFactory.isAuthenticated() && !angular.equals(vm.user, vm.master)) {
            UsersFactory.upsertUser(vm.user).then(function () {
               toastr.success('User updated successfully', 'Done');
            });
         }
      };

      vm.deleteUser = function (id) {
         if (AuthFactory.isAuthenticated()) {
            UsersFactory.deleteUser(id);
         }
      };

      vm.resetUser = function () {
         vm.user = vm.master;
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

      function openImageUploadModal() {
         $scope.$uibModalInstance = $uibModal.open({
            templateUrl: 'scripts/core/profile/profile.image-upload.modal/profile.image-upload.modal.html',
            controller: 'ProfileImageUploadModalController',
            controllerAs: 'profileImageUploadModalCtrl',
            size: 'lg',
            resolve: {
               images: function () {
                  ImagesFactory.getImages();
                  return ImagesFactory.images;
               },
               userId: function () {
                  return vm.user.id;
               }
            }
         });

         $scope.$uibModalInstance.result.then(function (profileImage) {
            vm.user.profile_image = profileImage;
            vm.upsertUser(vm.user);
         });
      }
      
      vm.openImageUploadModal = openImageUploadModal;
      
   }
   
   angular.module('lematClient.admin.users')
      .controller('UsersController', UsersController);

   UsersController.$inject = ['$scope', '$rootScope', '$uibModal', '$location', '$stateParams', 'AuthFactory', 'ImagesFactory', 'UsersFactory'];

})(angular);
