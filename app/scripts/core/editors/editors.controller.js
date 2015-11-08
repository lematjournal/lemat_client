(function (angular) {

   'use strict';

   function EditorsController($scope, $location, AuthFactory, UsersFactory) {
      var vm = this;
      
      vm.users = UsersFactory.users;

      $scope.exclude = function (elem) {
         return !elem.role.match(/^(admin|editor)$/);
      };

   }
   
   angular.module('lematClient.core.editors')
      .controller('EditorsController', EditorsController);

   EditorsController.$inject = ['$scope', '$location', 'AuthFactory', 'UsersFactory'];

})(angular);
