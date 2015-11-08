(function (angular) {

   'use strict';

   function FooterController($rootScope, AuthFactory, UsersFactory, $localStorage) {
      var vm = this;

      vm.postUsers = UsersFactory.postUsers;
      vm.issueUsers = UsersFactory.issueUsers;
      
   }

   angular.module('lematClient.core.layout.footer')
      .controller('FooterController', FooterController);

   FooterController.$inject = ['$rootScope', 'AuthFactory', 'UsersFactory', '$localStorage'];

})(angular);