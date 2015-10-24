(function (angular) {

   'use strict';

   function EntriesAdminController($scope, $stateParams, $location, $uibModal, AuthFactory, EntryFactory) {
      var vm = this;

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
      
      // user modal

      $scope.openUserModal = function () {
         $scope.$modalInstance = $uibModal.open({
            scope: $scope,
            templateUrl: 'scripts/admin/users/users.create.modal/users.create.modal.html',
            controller: 'UserController',
            size: 'lg'
         });
      };

      // user

      $scope.$on('selectedUser', function (event, data) {
         vm.entry.user_id = data.id;
      });
      
   }
   
   angular.module('lematClient.admin.entries')
      .controller('EntriesAdminController', EntriesAdminController);

   EntriesAdminController.$inject = ['$scope', '$stateParams', '$location', '$uibModal', 'AuthFactory', 'EntryFactory'];

})(angular);