'use strict';

angular.module('lematClient.controllers.admin').controller('ImageController', ['$scope', '$q', '$routeParams', 'AuthFactory', 'ImageFactory', function ($scope, $q, $routeParams, AuthFactory, ImageFactory) {

//   $scope.$watch(function () {
//      return $routeParams.user;
//   }, function (val) {
//      if (val) {
//         UserFactory.getUser($routeParams.user);
//         $scope.images = UserFactory.user.images;
//      }
//   });
   
   $scope.isAdmin = function () {
      return AuthFactory.isAdmin();
   };
   
   $scope.getImages = function () {
      ImageFactory.getImages().then(function () {
         $scope.images = ImageFactory.images;
      });
   };

   $scope.deleteImage = function (image) {
      ImageFactory.deleteImage(image.id).then(function () {
         $scope.images.splice(findImageIndexById(image.id), 1);
      });
   };

   var findImageIndexById = function (id) {
      for (var i = 0; i < $scope.images.length; i++) {
         if ($scope.images[i].id === id) {
            return i;
         }
      }
   };

//   $scope.getAS3Images = function () {
//      var bucket = new AWS.S3({
//         region: 'us-east-1',
//         credentials: new AWS.Credentials($scope.keys.access_key, $scope.keys.secret_key)
//      });
//      var params = {
//         Bucket: 'lematjournal',
//         EncodingType: 'url',
//         MaxKeys: 1000,
//         Prefix: 'uploads'
//      };
//      bucket.listObjects(params, function (err, data) {
//         if (err) {
//            console.log(err, err.stack); // an error occurred
//         } else {
//            angular.forEach(data.Contents, function (object) {
//               $scope.images.push('https://lematjournal.s3.amazonaws.com/' + object.Key);
//            });
//            $scope.images.splice(0, 1);
//         }
//      });
//   };
   
   // pagination

   $scope.pageChangeHandler = function () {
   };

   $scope.currentPage = 1;

}]);