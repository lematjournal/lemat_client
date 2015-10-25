(function (angular) {

   'use strict';

   function EntriesController($scope, $location, $filter, $stateParams, EntryFactory, IssuesFactory, PostsFactory) {
      var vm = this;
      
      vm.url = $location.absUrl();
      
      vm.identifier = $stateParams.entry;

      vm.getEntries = function () {
         EntryFactory.getEntries().then(function () {
            vm.entries = EntryFactory.entries;
            vm.entry = $filter('orderBy')(EntryFactory.entries, '-created_at')[0];
         });
      };

      vm.getEntry = function () {
         EntryFactory.getEntry($stateParams.entry);
         vm.entry = EntryFactory.entry;
      };
      
      vm.getIssues = function () {
         IssuesFactory.getIssues();
         vm.issues = IssuesFactory.issues;
      };
      
      vm.getPosts = function () {
         PostsFactory.getPosts().then(function () {
            vm.posts = PostsFactory.posts;
         });
      };


      // pagination

      $scope.pageChangeHandler = function (num) {
         console.log('going to page ' + num);
      };

      $scope.currentPage = 1;
   }
   
   angular.module('lematClient.core.entries')
      .controller('EntriesController', EntriesController);

   EntriesController.$inject = ['$scope', '$location', '$filter', '$stateParams', 'EntryFactory', 'IssuesFactory', 'PostsFactory'];

})(angular);