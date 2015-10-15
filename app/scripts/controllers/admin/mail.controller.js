(function (angular) {

   'use strict';

   angular.module('lematClient.controllers.admin')
      .controller('MailController', MailController)

   MailController.$inject = ['$scope', '$routeParams', 'EmailFactory'];

   function MailController($scope, $routeParams, EmailFactory) {
      var vm = this;
      vm.emails = [];

      vm.getEmails = function () {
         EmailFactory.getEmails().then(function () {
            vm.emails = EmailFactory.emails;
         });
      };

      vm.getEmail = function () {
         EmailFactory.getEmail($routeParams.email).then(function () {
            vm.email = EmailFactory.email;
         });
      };
   }

})(angular);