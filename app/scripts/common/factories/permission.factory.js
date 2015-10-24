'use strict';

angular.module('lematClient.common.factories')
   .factory('SecFactory', ['$rootScope', '$location', 'AuthFactory', function ($rootScope, $location, AuthFactory) {

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
         clearance = 3;
      } else if (role === 'editor') {
         clearance = 2;
      } else if (role === 'author') {
         clearance = 1;
      } else if (role === 'contributor') {
         clearance = 1;
      } else if (role === 'user') {
         clearance = 0;
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
      getPermission();
   };

   var getPermission = function () {
      var ifPermissionPassed = false;
      if (permissionCheck() >= permission.getLevel()) {
         ifPermissionPassed = true;
      } else {
         ifPermissionPassed = false;
      }
      if (!ifPermissionPassed) {
         $location.path('/');
      }
   };

   return {
      roles: roles,
      clearance: clearance,
      setPermission: setPermission,
      getPermission: getPermission,
      permission: permission,
      permissionLevel: permissionLevel,
      permissionCheck: permissionCheck,
   };
         }]);