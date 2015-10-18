'use strict';

angular.module('lematClient.factories')
   .factory('UserFactory', ['$http', 'AuthFactory', 'ServerUrl', function ($http, AuthFactory, ServerUrl) {
   var editors = [], users = [], user = {}, postUsers = [], profile = {}, issueUsers = [];

   var getUser = function (username) {
      return $http.get(ServerUrl + '/users/' + username).then(function (response) {
         angular.copy(response.data, user);
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
   
   var getEditors = function () {
      return $http.get(ServerUrl + '/users/editors').then(function (response) {
         angular.copy(response.data, editors);
      });
   };

   var upsertUser = function (user) {
      var params = {
         user: {
            email: user.email,
            username: user.username.replace(/[^\w\s]/gi, ''),
            role: user.role,
            bio: user.bio,
            password: user.password,
            profile_image: user.profile_image,
            social_links: user.social_links
         }
      };

      if (user.id) {
         return $http.patch(ServerUrl + '/users/' + user.id, params).then(function (response) {
            angular.copy(response.data, user);
            users.push(response.data);
            getUsers();
         });
      } else {
         return $http.post(ServerUrl + '/users/', params).then(function (response) {
            angular.copy(response.data, user);
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
   
   var getProfile = function (user) {
      return $http.get(ServerUrl + '/users/profiles/' + user.id).then(function (response) {
         angular.copy(response.data, profile);
      });
   };

   return {
      getEditors: getEditors,
      getUser: getUser,
      getUsers: getUsers,
      getPostUsers: getPostUsers,
      getIssueUsers: getIssueUsers,
      getProfile: getProfile,
      upsertUser: upsertUser,
      deleteUser: deleteUser,
      editors: editors,
      user: user,
      users: users,
      profile: profile,
      postUsers: postUsers,
      issueUsers: issueUsers
   };
}]);