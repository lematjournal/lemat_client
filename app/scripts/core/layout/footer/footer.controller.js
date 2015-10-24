(function (angular) {

   'use strict';

   function FooterController(UsersFactory) {
      var vm = this;

      UsersFactory.getPostUsers().then(function () {
         vm.postUsers = UsersFactory.postUsers;
      });
      
      UsersFactory.getIssueUsers().then(function () {
         vm.issueUsers = UsersFactory.issueUsers;
      });

   }

   angular.module('lematClient.core.layout.footer')
      .controller('FooterController', FooterController);

   FooterController.$inject = ['UsersFactory'];

})(angular);