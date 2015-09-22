'use strict';

angular.module('lematClient').factory('AuthFactory', ['$http', '$window', 'ServerUrl', function ($http, $window, ServerUrl) {

   var userId = {};
   
   var login = function (credentials) {
      return $http.post(ServerUrl + '/users/login', credentials).then(function (response) {
         var userId = response.id;
         _storeSession(response);
      });
   };

   var logout = function () {
      return $http.post(ServerUrl + '/users/logout').then(function (response) {
         $window.localStorage.removeItem('lemat-user');
         var userId = {};
         console.log("logged out")
      });
   };

   var register = function (credentials) {
      var params = {
         user: {
            email: credentials.email,
            password: credentials.password
         }
      };
      return $http.post(ServerUrl + '/posts/users/', params).then(function (response) {
         _storeSession(response);
      }, function (response) {
         console.log(response)
      });
   };

   var isAuthenticated = function () {
      var data = JSON.parse($window.localStorage.getItem('lemat-user'));
      if (data) {
         return true;
      } else {
         return false;
      }
   };

   var clearStorage = function () {};

   var _storeSession = function (response) {
      $window.localStorage.setItem('lemat-user', JSON.stringify(response));
      // best practice is to give unique prefixes to your variables
      if (response.data.role = "admin") {
         $http.defaults.headers.common.Authorization = 'Token token=' + response.data.token;
         console.log(response.data.token);
      };
   };

   if (isAuthenticated() === true) {
      var userId = JSON.parse($window.localStorage.getItem('lemat-user')).id;
   } else {
      var userId = null;
   };

   return {
      login: login,
      logout: logout,
      register: register,
      isAuthenticated: isAuthenticated,
      clearStorage: clearStorage,
      userId: userId
   };
}]);