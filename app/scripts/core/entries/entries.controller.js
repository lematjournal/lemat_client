(function (angular) {

   'use strict';

   function EntriesController($scope, $location, $filter, $stateParams, EntryFactory) {
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

      // pagination

      $scope.pageChangeHandler = function (num) {
         console.log('going to page ' + num);
      };

      $scope.currentPage = 1;
   }
   
   angular.module('lematClient.core.entries')
      .controller('EntriesController', EntriesController);

   EntriesController.$inject = ['$scope', '$location', '$filter', '$stateParams', 'EntryFactory'];

})(angular);