(function (angular) {

   'use strict';

   angular.module('lematClient.controllers.admin')
      .controller('MailController', MailController)

   MailController.$inject = ['$scope', '$routeParams', 'EmailFactory'];

   function MailController($scope, $routeParams, EmailFactory) {

      $scope.emails = [];

      $scope.getEmails = function () {
         EmailFactory.getEmails().then(function () {
            $scope.emails = EmailFactory.emails;
         });
      };

      $scope.getEmail = function () {
         EmailFactory.getEmail($routeParams.email).then(function () {
            $scope.email = EmailFactory.email;
         });
      };
   }

})(angular);