(function (angular) {

   'use strict';

   function UsersFactory($http, $localStorage, AuthFactory, ServerUrl) {
      var editors = [],
         users = $localStorage.users,
         user = {},
         postUsers = $localStorage.postUsers,
         profile = {},
         issueUsers = $localStorage.issueUsers;

      function getUser(username) {
         return $http.get(ServerUrl + '/users/' + username).then(function (response) {
            angular.copy(response.data, user);
         });
      }

      function getUsers() {
         return $http.get(ServerUrl + '/users/').then(function (response) {
            $localStorage.users = response.data;
            $localStorage.usersGrabDate = Date.now();
         });
      }

      function getPostUsers() {
         var promise = $http.get(ServerUrl + '/users/post-users').then(function (response) {
            $localStorage.postUsers = response.data;
            $localStorage.postUsersGrabDate = Date.now();
            return $localStorage.postUsers;
         });
         
         return promise;
      }
      
      function getIssueUsers() {
         var promise = $http.get(ServerUrl + '/users/issue-users').then(function (response) {
            $localStorage.issueUsers = response.data;
            $localStorage.issueUsersGrabDate = Date.now();
            return $localStorage.issueUsers;
         });
         
         return promise;
      }

      function getEditors() {
         return $http.get(ServerUrl + '/users/editors').then(function (response) {
            angular.copy(response.data, editors);
         });
      }

      function upsertUser(user) {
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
      }

      function findUserById(id) {
         for (var i = 0; i < users.length; i++) {
            if (users[i].id === id) {
               return i;
            }
         }
      }

      function deleteUser(id, username) {
         return $http.delete(ServerUrl + '/users/' + username).then(function () {
            users.splice(findUserById(id), 1);
         });
      }

      function getProfile(user) {
         return $http.get(ServerUrl + '/users/profiles/' + user.id).then(function (response) {
            angular.copy(response.data, profile);
         });
      }

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

   }

   angular.module('lematClient.common.factories')
      .factory('UsersFactory', UsersFactory);

   UsersFactory.$inject = ['$http', '$localStorage', 'AuthFactory', 'ServerUrl'];

})(angular);