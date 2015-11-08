(function (angular) {

   'use strict';

   function AuthFactory($http, $q, $window, ServerUrl) {
      var userId = {},
         session = {};

      function login(credentials) {
         return $http.post(ServerUrl + '/users/login', credentials).then(function (response) {
            userId = response.id;
            _storeSession(response);
         });
      }

      function logout() {
         return $http.post(ServerUrl + '/users/logout').then(function () {
            $window.localStorage.removeItem('lemat-user');
            userId = {};
            console.log("logged out");
         });
      }

      function register(credentials) {
         var params = {
            user: {
               email: credentials.email,
               password: credentials.password
            }
         };
         return $http.post(ServerUrl + '/users/', params).then(function (response) {
            _storeSession(response);
         }, function (response) {
            console.log(response);
         });
      }

      function isAuthenticated() {
         var data = JSON.parse($window.localStorage.getItem('lemat-user'));
         if (data) {
            return true;
         } else {
            return false;
         }
      }

      function isAdmin() {
         if ($window.localStorage.getItem('lemat-user')) {
            var user = JSON.parse($window.localStorage.getItem('lemat-user'));
            if (user.data.role === 'admin') {
               return true;
            } else {
               return false;
            }
         }
      }

      function getUserRole() {
         if (isAuthenticated()) {
            var user = JSON.parse($window.localStorage.getItem('lemat-user'));
            return user.data.role;
         } else {
            return 'user';
         }
      }

      function setUser() {
         var deferred = $q.defer();
         if ($window.localStorage.getItem('lemat-user')) {
            var user = JSON.parse($window.localStorage.getItem('lemat-user'));
            var user = {
               id: user.data.id,
               email: user.data.email,
               username: user.data.username,
               role: user.data.role,
               weight: user.data.weight
            };
            deferred.resolve(angular.copy(user, session));
         }

         return deferred.promise;

      }

      function _storeSession(response) {
         $window.localStorage.setItem('lemat-user', JSON.stringify(response));
         if (response.data.role = "admin") {
            $http.defaults.headers.common.Authorization = 'Token token=' + response.data.token;
            console.log(response.data.token);
         }
      }

      return {
         login: login,
         logout: logout,
         register: register,
         isAuthenticated: isAuthenticated,
         isAdmin: isAdmin,
         getUserRole: getUserRole,
         setUser: setUser,
         session: session
      };

   }

   angular.module('lematClient.common.factories')
      .factory('AuthFactory', AuthFactory);

   AuthFactory.$inject = ['$http', '$q', '$window', 'ServerUrl'];

})(angular);