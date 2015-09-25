'use strict';

angular.module('lematClient').factory('AS3Factory', ['$http', 'ServerUrl', function ($http, ServerUrl) {

   var images = [], image = {}, keys = {};

   var resetImage = function () {
      angular.copy({}, image);
   };

   var resetImages = function () {
      angular.copy([], images);
   };

   var getAS3keys = function () {
      return $http.get(ServerUrl + '/amazon/sign_key').then(function (response) {
         keys = response.data;
         return keys;
      });
   };

   var upload = function (file, keys) {
      console.log("keys: ", keys);
      var formData = [{
         key: keys.key,
         AWSAccessKeyId: keys.access_key,
         policy: keys.policy,
         signature: keys.signature,
         file: file
      }];
      
      console.log("form data: ", formData);
            
      $http.post('https://lematjournal.s3.amazonaws.com/', formData, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
      }).then(function (response) {
         console.log(response);
//         var params = {
//            image_url: keys.data.key
//         };
//
//         $http.post(ServerUrl + '/images/' + params).then(function (response) {
//            angular.copy(response, image);
//            images.push(response);
//            console.log("images: ", images);
//         }, function (response) {
//            console.log("error: ", response);
//         });
      });
   };

   var deleteImage = function (id) {
      return $http.delete(ServerUrl + '/images/' + id);
   };

   return {
      getAS3keys: getAS3keys,
      upload: upload,
      resetImage: resetImage,
      resetImages: resetImages,
      deleteImage: deleteImage,
      images: images,
      keys: keys
   };
}]);