'use strict';

angular.module('lematClient').factory('SecFactory', ['$resource', '$q', '$rootScope', '$location', 'AuthFactory', function ($resource, $q, $rootScope, $location, AuthFactory) {

   var roles = {
      admin: 3,
      editor: 2,
      author: 1,
      contributor: 1,
      user: 0
   };

   var clearance = {};

   var permission = {};

   var permissionCheck = function () {
      var role = AuthFactory.getUserRole();
      if (role === 'admin') {
         clearance = 3
            //         console.log('user is administrator, clearance: ', clearance);
      } else if (role === 'editor') {
         clearance = 2
            //         console.log('user is an editor, clearance: ', clearance);
      } else if (role === 'author') {
         clearance = 1
            //         console.log('user is an author, clearance: ', clearance);
      } else if (role === 'contributor') {
         clearance = 1
            //         console.log('user is a contributing artist, clearance: ', clearance);
      } else if (role === 'user') {
         clearance = 0
            //         console.log('user is a generic user, clearance', clearance);
      }
      return clearance;
   };

   var permissionLevel = function (role) {
      // there is probably a more programmatic way of doing this
      if (role === 'admin') {
         this.role = roles.admin;
      } else if (role === 'editor') {
         this.role = roles.editor;
      } else if (role === 'author') {
         this.role = roles.author;
      } else if (role === 'contributor') {
         this.role = roles.contributor;
      } else {
         this.role = roles.user;
      }
   };

   permissionLevel.prototype.getLevel = function () {
      return this.role;
   };

   var setPermission = function (role) {
      permission = new permissionLevel(role);
   };

   var getPermission = function () {
      var ifPermissionPassed = false;
      //      console.log("route clearance: ", permission.getLevel());
      if (permissionCheck() >= permission.getLevel()) {
         ifPermissionPassed = true
            //         console.log('clearance passed');
      } else {
         ifPermissionPassed = false;
         //         console.log('clearance failed');
      }
      if (!ifPermissionPassed) {
         $location.path('/');
      }
   };

   return {
      roles: roles,
      clearance: clearance,
      setPermission: setPermission,
      permission: permission,
      permissionLevel: permissionLevel,
      permissionCheck: permissionCheck,
      getPermission: getPermission
   };
         }]);