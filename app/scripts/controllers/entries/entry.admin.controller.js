(function (angular) {

   'use strict';

   angular.module('lematClient.controllers.entries')
      .controller('EntryAdminController', EntryAdminController);

   EntryAdminController.$inject = ['$scope', '$rootScope', '$route', '$routeParams', '$location', '$document', 'AuthFactory', 'EntryFactory'];

   function EntryAdminController($scope, $rootScope, $route, $routeParams, $location, $document, AuthFactory, EntryFactory) {
      $scope.entry = {};

      $scope.identifier = $routeParams.id;

      $scope.getEntries = function () {
         EntryFactory.getEntries();
         $scope.entries = EntryFactory.entries;
      };

      $scope.getEntry = function () {
         EntryFactory.getEntry($routeParams.entry);
         $scope.entry = EntryFactory.entry;
      };

      // entry crud actions

      $scope.upsertEntry = function (entry) {
         if (AuthFactory.isAuthenticated()) {
            EntryFactory.upsertEntry(entry);
            $location.path('/entry-admin');
            EntryFactory.getEntries();
         }
      };

      $scope.deleteIssue = function (id) {
         if (AuthFactory.isAuthenticated()) {
            EntryFactory.deletePost(id);
            $location.path('/entry-admin');
            EntryFactory.getEntries();
         }
      };

      // user

      $scope.$on('selectedUser', function (event, data) {
         $scope.entry.user_id = data.id;
      });
   }

})(angular);