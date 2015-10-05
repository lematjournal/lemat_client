'use strict';

angular.module('lematClient').controller('ImageController', ['$scope', '$q', '$routeParams', 'AuthFactory', 'AS3Factory', 'UserFactory', function ($scope, $q, $routeParams, AuthFactory, AS3Factory, UserFactory) {

   $scope.$watch(function () {
      return $routeParams.user;
   }, function (val) {
      if (val) {
         UserFactory.getUser($routeParams.user);
         $scope.images = UserFactory.user.images;
      }
   });
   
   $scope.isAdmin = function () {
      return AuthFactory.isAdmin();
   };

   $scope.getKeys = function () {
      var deferred = $q.defer();
      AS3Factory.getAS3keys().then(function () {
         deferred.resolve($scope.keys = AS3Factory.keys);
      });
      return deferred.promise;
   };

   $scope.getKeys();

   $scope.deleteImage = function (image) {
      AS3Factory.deleteImage(image.id).then(function (response) {
         $scope.deleteAS3Image(image.image_url);
         $scope.images.splice(findImageIndexById(image.id), 1);
      });
   };

   $scope.deleteAS3Image = function (key) {
      var bucket = new AWS.S3({
         region: 'us-east-1',
         credentials: new AWS.Credentials($scope.keys.access_key, $scope.keys.secret_key)
      });
      key = key.replace('https://lematjournal.s3.amazonaws.com/', '');
      console.log(key);
      var params = {
         Bucket: 'lematjournal',
         Key: key
      };
      bucket.deleteObject(params, function (err, data) {
         if (err) {
            console.log(err, err.stack); // an error occurred
         }
      });
   };

   var findImageIndexById = function (id) {
      for (var i = 0; i < $scope.images.length; i++) {
         if ($scope.images[i].id === id) {
            return i;
         }
      }
   };

   $scope.getAS3Images = function () {
      var bucket = new AWS.S3({
         region: 'us-east-1',
         credentials: new AWS.Credentials($scope.keys.access_key, $scope.keys.secret_key)
      });
      var params = {
         Bucket: 'lematjournal',
         EncodingType: 'url',
         MaxKeys: 1000,
         Prefix: 'uploads'
      };
      bucket.listObjects(params, function (err, data) {
         if (err) {
            console.log(err, err.stack); // an error occurred
         } else {
            angular.forEach(data.Contents, function (object) {
               $scope.images.push('https://lematjournal.s3.amazonaws.com/' + object.Key);
            });
            $scope.images.splice(0, 1);
         }
      });
   };

   $scope.getAllImages = function () {
      $scope.getKeys().then(function () {
         AS3Factory.getAS3Images().then(function () {
            $scope.images = AS3Factory.images;
         });
      });
   };
   
   // pagination

   $scope.pageChangeHandler = function (num) {
//      console.log('going to page ' + num);
   };

   $scope.currentPage = 1;

}]);