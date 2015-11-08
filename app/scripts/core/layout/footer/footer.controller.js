(function (angular) {

   'use strict';

   function FooterController($rootScope, $state, AuthFactory, UsersFactory, $localStorage) {
      var vm = this;

      function getContributors() {
         if (!UsersFactory.issueUsers) {
            console.log('no issue users, grabbing');
            UsersFactory.getIssueUsers().then(function (response) {
               vm.issueUsers = response;
            });
         } else if (($localStorage.issueUsersGrabDate.valueOf() - Date.now().valueOf()) > (1000 * 60 * 60 * 72)) {
            UsersFactory.getIssueUsers().then(function (response) {
               vm.issueUsers = response;
            });
         } else {
            vm.issueUsers = UsersFactory.issueUsers;
         }
      }

      getContributors();

      function getOnlineUsers() {
         if (!UsersFactory.postUsers) {
            console.log('no post users, grabbing');
            UsersFactory.getPostUsers().then(function (response) {
               vm.postUsers = response;
            });
         } else if (($localStorage.postUsersGrabDate.valueOf() - Date.now().valueOf()) > (1000 * 60 * 60 * 72)) {
            UsersFactory.getPostUsers().then(function (response) {
               vm.postUsers = response;
            });
         } else {
            vm.postUsers = UsersFactory.postUsers;
         }
      }


   }

   angular.module('lematClient.core.layout.footer')
      .controller('FooterController', FooterController);

   FooterController.$inject = ['$rootScope', '$state', 'AuthFactory', 'UsersFactory', '$localStorage'];

})(angular);