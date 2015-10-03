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
      return $http.post(ServerUrl + '/users/logout').then(function () {
         $window.localStorage.removeItem('lemat-user');
         var userId = {};
         console.log("logged out");
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
         console.log(response);
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
   
   var isAdmin = function () {
      var user = JSON.parse($window.localStorage.getItem('lemat-user'));
      if (user.data.role === 'admin') {
         return true;
      } else {
         return false
      }
   };
   
   var getUserRole = function () {
      var user = JSON.parse($window.localStorage.getItem('lemat-user'));
      return user.data.role;
   };

   var _storeSession = function (response) {
      $window.localStorage.setItem('lemat-user', JSON.stringify(response));
      // best practice is to give unique prefixes to your variables
      if (response.data.role = "admin") {
         $http.defaults.headers.common.Authorization = 'Token token=' + response.data.token;
         console.log(response.data.token);
      }
   };
   
   var setUserId = function () {
      var user = JSON.parse($window.localStorage.getItem('lemat-user'));
      
      if (isAuthenticated() === true) {
         userId = user.data.id;
      } else {
         var userId = null;
      }
      return userId;
   };

   return {
      login: login,
      logout: logout,
      register: register,
      isAuthenticated: isAuthenticated,
      isAdmin: isAdmin,
      setUserId: setUserId,
      getUserRole: getUserRole,
      userId: userId
   };
}]);