'use strict';

angular.module('lematClient.factories')
   .factory('EmailFactory', ['$http', 'ServerUrl', function ($http, ServerUrl) {
   
   var emails = [], email = {};
   
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
}]);