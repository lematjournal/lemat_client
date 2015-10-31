(function (angular) {

   'use strict';

   function EmailFactory($http, ServerUrl) {

      var emails = [],
         email = {};

      var getEmails = function () {
         return $http.get(ServerUrl + '/emails/').then(function (response) {
            angular.copy(response.data, emails);
         });
      };

      var getEmail = function (id) {
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