(function (angular) {

   'use strict';

   function EntriesAdminController($scope, $stateParams, $location, $uibModal, AuthFactory, EntryFactory, ImagesFactory) {
      var vm = this;
      
      vm.entry = {};
      
      vm.identifier = $stateParams.entry;

      vm.getEntries = function () {
         EntryFactory.getEntries().then(function () {
            vm.entries = EntryFactory.entries;
         });
      };

      vm.getEntry = function () {
         EntryFactory.getEntry($stateParams.entry).then(function () {
            vm.entry = EntryFactory.entry;
         });
      };

      // entry crud actions

      vm.upsertEntry = function (entry) {
         if (AuthFactory.isAuthenticated()) {
            EntryFactory.upsertEntry(entry);
            $location.path('/admin/entries');
         }
      };

      vm.deleteEntry = function (id) {
         if (AuthFactory.isAuthenticated()) {
            EntryFactory.deleteEntry(id);
            $location.path('/admin/entries');
         }
      };
      
      function openUserModal() {
         $scope.$uibModalInstance = $uibModal.open({
            scope: $scope,
            templateUrl: 'scripts/admin/users/users.create.modal/users.create.modal.html',
            controller: 'UsersCreateModalController',
            controllerAs: 'usersCreateModalCtrl',
            size: 'lg'
         });
         
         $scope.$uibModalInstance.result.then(function (user) {
            vm.entry.user_id = user.id;
         });
      };
      
      vm.openUserModal = openUserModal;
      
      function openImageUploadModal() {
         $scope.$uibModalInstance = $uibModal.open({
            scope: $scope,
            templateUrl: 'scripts/admin/images/images.upload.modal/images.upload.modal.html',
            controller: 'ImagesUploadModalController',
            controllerAs: 'imagesUploadModalCtrl',
            size: 'lg',
            resolve: {
               images: function () {
                  ImagesFactory.getImages();
                  return ImagesFactory.images;
               }
            }
         });
         
         $scope.$uibModalInstance.result.then(function (image) {
            vm.entry.image_url = image.image_url;
            console.log(image);
         });
      }
      
      vm.openImageUploadModal = openImageUploadModal;

      // user

      $scope.$on('selectedUser', function (event, data) {
         vm.entry.user_id = data.id;
      });
      
   }
   
   angular.module('lematClient.admin.entries')
      .controller('EntriesAdminController', EntriesAdminController);

   EntriesAdminController.$inject = ['$scope', '$stateParams', '$location', '$uibModal', 'AuthFactory', 'EntryFactory', 'ImagesFactory'];

})(angular);