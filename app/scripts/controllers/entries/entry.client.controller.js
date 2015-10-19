(function (angular) {

   'use strict';

   function EntryClientController($scope, $location, $routeParams, EntryFactory) {
      var vm = this;

      vm.url = $location.absUrl();

      vm.entry = {};

      vm.entries = [];

      vm.identifier = $routeParams.id;

      vm.getEntries = function () {
         EntryFactory.getEntries();
         vm.entries = EntryFactory.entries;
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

   EntryClientController.$inject = ['$scope', '$location', '$routeParams', 'EntryFactory'];

})(angular);