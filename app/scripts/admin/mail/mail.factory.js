(function (angular) {

   'use strict';

   function EmailFactory($http, ServerUrl) {

      var emails = [],
         email = {};

      function getEmails() {
         return $http.get(ServerUrl + '/emails/').then(function (response) {
            angular.copy(response.data, emails);
         });
      };

      function getEmail(id) {
         return $http.get(ServerUrl + '/emails/' + id).then(function (response) {
            angular.copy(response.data, email);
         });
      };

      return {
         getEmails: getEmails,
         getEmail: getEmail,
         emails: emails,
         email: email
      };
   }
   
   angular.module('lematClient.admin.mail')
      .factory('EmailFactory', EmailFactory)

   EmailFactory.$inject = ['$http', 'ServerUrl'];

})(angular);