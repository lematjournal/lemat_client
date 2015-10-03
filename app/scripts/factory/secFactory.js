'use strict';

angular.module('lematClient').factory('SecFactory', ['$resource', '$q', '$rootScope', '$location', 'AuthFactory', function ($resource, $q, $rootScope, $location, AuthFactory) {

   var permissionCheck = function () {
      return AuthFactory.getUserRole();
   };

   var getPermission = function (role) {
      var ifPermissionPassed = false;
      if (permissionCheck() === 'admin') {
         ifPermissionPassed = true;
      } else {
         ifPermissionPassed = false;
      }
      if (!ifPermissionPassed) {
         $location.path('/');
      }
   };
   
   return {
      permissionCheck: permissionCheck,
      getPermission: getPermission
   };
}]);