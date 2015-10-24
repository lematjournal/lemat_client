(function (angular) {

   'use strict';

   function fileSelect($q, $timeout, AS3Factory) {
      var directive = {
         restrict: 'AE',
         require: 'ngModel',
         scope: {
            folder: '=',
            uploadAction: '='
         },
         link: link
      };

      return directive;

      function link(scope, element, attrs, ngModel) { // note: ngModel needs to be the 4th argument in link or everything breaks
         scope.uploadFile = function (file, folder) {
            var deferred = $q.defer();
            deferred.resolve(AS3Factory.uploadFile(file, folder).then(function (response) {
               var s3Path = 'https://lematjournal.s3.amazonaws.com/' + response.params.Key;
               scope.filename = s3Path;
            }));
            return deferred.promise;
         };

         element.bind('change', function (event) {
            var files = event.target.files;
            var file = files[0];
            scope.file = file;
            scope.uploadFile(scope.file, scope.folder, scope.uploadAction).then(function () {
               console.log(scope.filename);
               $timeout(function () {
                  ngModel.$setViewValue(scope.filename);
               }, 1000).then(function () {
                  if (scope.uploadAction) {
                     scope.uploadAction();
                  }
               });
            });
         });
      }
   }
   
   angular.module('lematClient.common.directives')
      .directive('fileSelect', fileSelect);

   fileSelect.$inject = ['$q', '$timeout', 'AS3Factory'];

})(angular);