'use strict';

angular.module('lematClient').factory('UserFactory', ['$http', 'AuthFactory', 'ServerUrl', function ($http, AuthFactory, ServerUrl) {
   var users = [];
   var user = {};

   var getUser = function (id) {
      return $http.get(ServerUrl + '/users/' + id).then(function (response) {
         angular.copy(response.data, user);
      });
   };

   var getUsers = function () {
      return $http.get(ServerUrl + '/users/').then(function (response) {
         angular.copy(response.data, users);
      });
   };

   var upsertUser = function (user) {
      var params = {
         user: {
            email: user.email,
            username: user.username,
            role: user.role,
            password: user.password
         }
      }

      if (user.id) {
         return $http.patch(ServerUrl + '/users/' + user.id, params).then(function (response) {
            users.push(response.data);
            getUsers();
         });
      } else {
         return $http.post(ServerUrl + '/users/', params).then(function (response) {
            users.push(response.data);
            getUsers();
         });
      }
   };

   var findUserById = function (id) {
      for (var i = 0; i < users.length; i++) {
         if (users[i].id === id) {
            return i;
         }
      }
   };

   var deleteUser = function (id) {
      return $http.delete(ServerUrl + '/users/' + id).then(function () {
         users.splice(findUserById(id), 1);
      });
   };

   return {
      getUser: getUser,
      getUsers: getUsers,
      upsertUser: upsertUser,
      deleteUser: deleteUser,
      user: user,
      users: users
   };
}]);