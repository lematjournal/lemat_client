(function (angular) {

   'use strict';

   function MailController($scope, $stateParams, EmailFactory) {
      var vm = this;

      vm.getEmails = function () {
         EmailFactory.getEmails().then(function () {
            vm.emails = EmailFactory.emails;
         });
      };

      vm.getEmail = function () {
         EmailFactory.getEmail($stateParams.email).then(function () {
            vm.email = EmailFactory.email;
         });
      };
   }
   
   angular.module('lematClient.admin.mail')
      .controller('MailController', MailController);

   MailController.$inject = ['$scope', '$stateParams', 'EmailFactory'];

})(angular);