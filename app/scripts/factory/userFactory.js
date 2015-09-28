'use strict';

angular.module('lematClient').factory('UserFactory', ['$http', 'AuthFactory', 'ServerUrl', function ($http, AuthFactory, ServerUrl) {
   var users = [], user = {}, postUsers = [], issueUsers = [];

   var getUser = function (username) {
      return $http.get(ServerUrl + '/users/' + username).then(function (response) {
         var params = {
            email: response.data.email,
            username: response.data.username,
            role: response.data.role,
            image: response.data.image,
            pieces: response.data.pieces,
            posts: response.data.posts,
            entries: response.data.entries
         };
         angular.copy(params, user);
      });
   };

   var getUsers = function () {
      return $http.get(ServerUrl + '/users/').then(function (response) {
         angular.copy(response.data, users);
      });
   };
   
   var getPostUsers = function () {
      return $http.get(ServerUrl + '/users/post-users').then(function (response) {
         angular.copy(response.data, postUsers);
      });
   };
   
   var getIssueUsers = function () {
      return $http.get(ServerUrl + '/users/issue-users').then(function (response) {
         angular.copy(response.data, issueUsers);
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
      };

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

   var deleteUser = function (id, username) {
      return $http.delete(ServerUrl + '/users/' + username).then(function () {
         users.splice(findUserById(id), 1);
      });
   };

   return {
      getUser: getUser,
      getUsers: getUsers,
      getPostUsers: getPostUsers,
      getIssueUsers: getIssueUsers,
      upsertUser: upsertUser,
      deleteUser: deleteUser,
      user: user,
      users: users,
      postUsers: postUsers,
      issueUsers: issueUsers
   };
}]);