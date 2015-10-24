'use strict';

angular.module('lematClient.admin.images')
   .factory('ImagesFactory', ['$http', 'ServerUrl', function ($http, ServerUrl) {
   var images = [],
      image = {};
   
   var getImages = function () {
      return $http.get(ServerUrl + '/content/images/').then(function (response) {
         angular.copy(response.data, images);
      });
   };

   var deleteImage = function (id) {
      return $http.delete(ServerUrl + '/content/images/' + id).then(function () {});
   };

   var uploadImage = function (image) {
      console.log('input image', image);
      var params = {
         image: {
            image_url: image.image_url,
            user_id: image.user_id,
         }
      };
      console.log('params', params);
      return $http.post(ServerUrl + '/content/images/', params).then(function (response) {
         angular.copy(response.data, image);
      }, function (response) {
         console.log("error: ", response);
      });
   };

   return {
      getImages: getImages,
      uploadImage: uploadImage,
      deleteImage: deleteImage,
      images: images,
      image: image,
   };
}]);