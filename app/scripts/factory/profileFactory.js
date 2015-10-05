'use strict';

angular.module('lematClient').factory('ProfileFactory', ['$http', 'ServerUrl', function ($http, ServerUrl) {
   
   var profile = {};
   
   var getProfile = function (user) {
      return $http.get(ServerUrl + '/profile/' + user.id).then(function (response) {
         angular.copy(response.data, profile);
      });
   };
   
   return {
      getProfile: getProfile,
      profile: profile
   }
}]);