'use strict';

angular.module('lematClient').controller('UploadController', ['$scope', '$rootScope', '$modal', '$location', '$q', '$http', '$timeout', '$routeParams', 'AuthFactory', 'AS3Factory', 'UserFactory', function ($scope, $rootScope, $modal, $location, $q, $http, $timeout, $routeParams, AuthFactory, AS3Factory, UserFactory) {

   $scope.file = {};
   $scope.images = [];

   $scope.getUserImages = function () {
      $scope.getKeys();
      UserFactory.getUser($routeParams.user).then(function () {
         $scope.images = UserFactory.user.images;
      });
   };

   // defers until keys are returned
   // might not be the best way to do this

   $scope.getKeys = function () {
      var deferred = $q.defer();
      AS3Factory.getAS3keys().then(function () {
         deferred.resolve($scope.keys = AS3Factory.keys);
      });
      return deferred.promise;
   };

   $scope.uploadImage = function () {
      var bucket = new AWS.S3({
         region: 'us-east-1',
         credentials: new AWS.Credentials($scope.keys.access_key, $scope.keys.secret_key)
      });

      if ($scope.file) {
         var fileSize = Math.round(parseInt($scope.file.size));
         if (fileSize > $scope.sizeLimit) {
            toastr.error('Sorry, your attachment is too big. <br/> Maximum ' + $scope.fileSizeLabel() + ' file attachment allowed', 'File Too Large');
            return false;
         }

         var uniqueFileName = $scope.uniqueString() + '-' + $scope.file.name;
         var params = {
            Bucket: 'lematjournal',
            Key: 'uploads/' + uniqueFileName,
            ContentType: $scope.file.type,
            Body: $scope.file,
            ServerSideEncryption: 'AES256'
         };

         bucket.putObject(params, function (err, data) {
            if (err) {
               // There Was An Error With Your S3 Config
               toastr.error(err.message, err.code);
               return false;
            } else {
               // Success!
               toastr.success('File Uploaded Successfully', 'Done');
               // Reset The Progress Bar
               $timeout(function () {
                  $scope.uploadProgress = 0;
                  $scope.$digest();
               }, 4000);
               var s3Path = 'https://lematjournal.s3.amazonaws.com/uploads/' + uniqueFileName;
               var image = {
                  imageUrl: s3Path,
                  userId: $scope.$parent.user.id
               };
               AS3Factory.uploadImage(image).then(function () {
                  UserFactory.getUser($routeParams.user);
                  $scope.$emit('profileImage', $scope.images[$scope.images.length - 1].image_url);
               });
            }
         }).on('httpUploadProgress', function (progress) {
            // Log Progress Information
            $scope.uploadProgress = Math.round(progress.loaded / progress.total * 100);
            $scope.$digest();
         });
      } else {
         // No File Selected
         toastr.error('Please select a file to upload');
      }
   };

   $scope.uniqueString = function () {
      var text = "";
      var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

      for (var i = 0; i < 16; i++) {
         text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
   }

   $scope.uploadFile = function (folder) {
      console.log(folder);
      $scope.getKeys().then(function () {
         var bucket = new AWS.S3({
            region: 'us-east-1',
            credentials: new AWS.Credentials($scope.keys.access_key, $scope.keys.secret_key)
         });

         if ($scope.file) {
            var params = {
               Bucket: 'lematjournal',
               Key: 'uploads/' + folder + $scope.file.name.replace(/\s/g, "-").toLowerCase(),
               ContentType: $scope.file.type,
               Body: $scope.file,
               ServerSideEncryption: 'AES256'
            };

            bucket.putObject(params, function (err, data) {
               if (err) {
                  toastr.error(err.message, err.code);
                  return false;
               } else {
                  toastr.success('File Uploaded Successfully', 'Done');
               }
            });
         } else {
            toastr.error('Please select a file to upload');
         }
      });
      return 'https://lematjournal.s3.amazonaws.com/uploads/' + folder + $scope.file.name.replace(/\s/g, "-").toLowerCase();
   };

   $scope.fileSizeLabel = function () {
      return Math.round($scope.sizeLimit / 1024 / 1024) + 'MB';
   };

   $scope.openImageManager = function () {
      $scope.$modalInstance = $modal.open({
         scope: $scope,
         controller: 'ImageController',
         templateUrl: 'views/modals/image-manager.html',
         size: 'lg'
      });
   };

}]);