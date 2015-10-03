'use strict';

angular.module('lematClient').directive('file', function () {
   return {
      restrict: 'AE',
      scope: {
         file: '@'
      },
      link: function (scope, element, attrs) {
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

angular.module('lematClient').directive('fileSelect', function () {
   return {
      restrict: 'AE',
      require: 'ngModel',
      scope: {
         folder: '='
      },
      controller: 'UploadController',
      link: function (scope, element, attrs, ngModel) {
         element.bind('change', function (event) {
            var files = event.target.files;
            var file = files[0];
            scope.file = file;
            var filename = scope.uploadFile(scope.folder);
            ngModel.$setViewValue(filename);
            scope.$apply();
         });
      }
   };
});

angular.module('lematClient').directive('uploadfile', function () {
    return {
      restrict: 'A',
      link: function(scope, element) {
        element.bind('click', function(element) {
            angular.element(element.target).siblings('#upload').trigger('click');
        });
      }
    };
});