(function (angular) {

   'use strict';

   function EntryClientController($scope, $location, $filter, $routeParams, EntryFactory) {
      var vm = this;

      vm.url = $location.absUrl();
      
      vm.identifier = $routeParams.id;

      vm.getEntries = function () {
         EntryFactory.getEntries().then(function () {
            vm.entries = EntryFactory.entries;
            vm.entry = $filter('orderBy')(EntryFactory.entries, '-created_at')[0];
         });
      };

      vm.getEntry = function () {
         EntryFactory.getEntry($routeParams.entry);
         vm.entry = EntryFactory.entry;
      };

      // pagination

      $scope.pageChangeHandler = function (num) {
         console.log('going to page ' + num);
      };

      $scope.currentPage = 1;
   }
   
   angular.module('lematClient.controllers.entries')
      .controller('EntryClientController', EntryClientController);

   EntryClientController.$inject = ['$scope', '$location', '$filter', '$routeParams', 'EntryFactory'];

})(angular);