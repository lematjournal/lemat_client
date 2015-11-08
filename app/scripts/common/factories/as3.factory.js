(function (angular) {

   'use strict';

   function AS3Factory($http, $q, ServerUrl) {
      var keys = {};

      function getKeys() {
         return $http.get(ServerUrl + '/amazon/sign_key').then(function (response) {
            angular.copy(response.data, keys);
         });
      }

      function uploadFile(file, folder) {
         var deferred = $q.defer();
         getKeys().then(function () {
            var bucket = new AWS.S3({
               region: 'us-east-1',
               credentials: new AWS.Credentials(keys.access_key, keys.secret_key)
            });
            if (file) {
               var uniqueFileName = uniqueString() + '-' + file.name.replace(/\s+/g, '-').toLowerCase();
               var params = {
                  Bucket: 'lematjournal',
                  Key: folder + uniqueFileName,
                  ContentType: file.type,
                  Body: file,
                  ServerSideEncryption: 'AES256'
               };

               deferred.resolve(bucket.putObject(params, function (err, data) {
                  if (err) {
                     return false;
                  } else {
                     return true;
                  }
               }));
            } else {
               console.log('Please select a file to upload');
            }
         });
         
         return deferred.promise;
         
      };

      function deleteFile(key) {
         console.log(key);
         var deferred = $q.defer();
         getKeys().then(function () {
            var bucket = new AWS.S3({
               region: 'us-east-1',
               credentials: new AWS.Credentials(keys.access_key, keys.secret_key)
            });
            key = key.replace('https://lematjournal.s3.amazonaws.com/', '');
            console.log(key);
            var params = {
               Bucket: 'lematjournal',
               Key: key
            };
            deferred.resolve(bucket.deleteObject(params, function (err, data) {
               if (err) {
                  console.log(err, err.stack);
               }
            }));
         });
         
         return deferred.promise;
      }
      
      function uniqueString() {
         var text = "";
         var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

         for (var i = 0; i < 16; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
         }
         
         return text;
         
      }

      return {
         getKeys: getKeys,
         uploadFile: uploadFile,
         deleteFile: deleteFile,
         keys: keys
      };
   }

   angular.module('lematClient.common.factories')
      .factory('AS3Factory', AS3Factory);

   AS3Factory.$inject = ['$http', '$q', 'ServerUrl'];

})(angular);