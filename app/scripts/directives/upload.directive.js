'use strict';

angular.module('lematClient').directive('file', function () {
   return {
      restrict: 'AE',
      scope: {
         file: '@'
      },
      link: function (scope, element) {
         element.bind('change', function (event) {
            var files = event.target.files;
            var file = files[0];
            scope.file = file;
            scope.$parent.file = file;
            scope.$apply();
         });
      }
   };
});

angular.module('lematClient').directive('fileSelect', ['$q', '$timeout', 'AS3Factory', function ($q, $timeout, AS3Factory) {
   return {
      restrict: 'AE',
      require: 'ngModel',
      scope: {
         folder: '=',
         uploadAction: '='
      },
      link: function (scope, element, ngModel) {
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
   };
}]);

angular.module('lematClient').directive('uploadfile', function () {
   return {
      restrict: 'A',
      link: function (scope, element) {
         element.bind('click', function (element) {
            angular.element(element.target).siblings('#upload').trigger('click');
         });
      }
   };
});