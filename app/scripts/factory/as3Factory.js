'use strict';

angular.module('lematClient').factory('AS3Factory', ['$http', 'ServerUrl', function ($http, ServerUrl) {

   var keys = {}, images = [], image = {};

   var getAS3keys = function () {
      return $http.get(ServerUrl + '/amazon/sign_key').then(function (response) {
         angular.copy(response.data, keys);
      });
   };
   
   var getAS3Images = function () {
      return $http.get(ServerUrl + '/images/').then(function (response) {
         angular.copy(response.data, images);
      });
   };
   
   var deleteImage = function (id) {
      return $http.delete(ServerUrl + '/images/' + id).then(function () {
      });
   };

   var uploadImage = function (image) {
      var params = {
         image: {
            image_url: image.imageUrl,
            issue_id: image.issueId,
            user_id: image.userId
         }
      };
      return $http.post(ServerUrl + '/images/', params).then(function (response) {
         angular.copy(response.data, image);
      }, function (response) {
         console.log("error: ", response);
      });
   };
   
   return {
      getAS3keys: getAS3keys,
      getAS3Images: getAS3Images,
      uploadImage: uploadImage,
      deleteImage: deleteImage,
      images: images,
      image: image,
      keys: keys
   };
}]);