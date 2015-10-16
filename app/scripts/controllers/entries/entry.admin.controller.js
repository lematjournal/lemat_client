(function (angular) {

   'use strict';

   angular.module('lematClient.controllers.entries')
      .controller('EntryAdminController', EntryAdminController);

   EntryAdminController.$inject = ['$scope', '$rootScope', '$route', '$routeParams', '$location', '$uibModal', 'AuthFactory', 'EntryFactory'];

   function EntryAdminController($scope, $rootScope, $route, $routeParams, $location, $uibModal, AuthFactory, EntryFactory) {
      var vm = this;

      vm.entry = {};

      vm.identifier = $routeParams.id;

      vm.getEntries = function () {
         EntryFactory.getEntries();
         vm.entries = EntryFactory.entries;
      };

      vm.getEntry = function () {
         EntryFactory.getEntry($routeParams.entry);
         vm.entry = EntryFactory.entry;
      };

      // entry crud actions

      vm.upsertEntry = function (entry) {
         if (AuthFactory.isAuthenticated()) {
            EntryFactory.upsertEntry(entry);
            $location.path('/admin/entries');
            $route.reload();
         }
      };

      vm.deleteIssue = function (id) {
         if (AuthFactory.isAuthenticated()) {
            EntryFactory.deletePost(id);
            $location.path('/admin/entries');
            $route.reload();
         }
      };
      
      // user modal

      $scope.openUserModal = function () {
         $scope.$modalInstance = $uibModal.open({
            scope: $scope,
            templateUrl: 'views/modals/user-create.html',
            controller: 'UserController',
            size: 'lg'
         });
      };

      // user

      $scope.$on('selectedUser', function (event, data) {
         vm.entry.user_id = data.id;
      });
   }

})(angular);