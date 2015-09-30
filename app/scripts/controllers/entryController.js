'use strict';

angular.module('lematClient').controller('EntryController', ['$scope', '$rootScope', '$route', '$routeParams', '$location', '$document', 'AuthFactory', 'EntryFactory', function ($scope, $rootScope, $route, $routeParams, $location, $document, AuthFactory, EntryFactory) {
   
   $scope.url = $location.absUrl();
   
   $scope.entry = {};
   
   $scope.identifier = $routeParams.id;

   $scope.getEntries = function () {
      EntryFactory.getEntries();
      $scope.entries = EntryFactory.entries;
   };

   $scope.getEntry = function () {
      EntryFactory.getEntry($routeParams.id);
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

   // pagination

   $scope.pageChangeHandler = function (num) {
      console.log('going to page ' + num);
   };

   $scope.currentPage = 1;

   // user

   $scope.$on('selectedUser', function (event, data) {
      $scope.entry.user_id = data.id;
   });

}]);