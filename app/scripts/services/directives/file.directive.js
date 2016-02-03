'use strict';

export default function file() {
  'ngInject';
  var directive = {
    restrict: 'AE',
    scope: {
      file: '@'
    },
    link: link
  };

  return directive;

  function link(scope, element) {
    element.bind('change', function(event) {
      var files = event.target.files;
      var file = files[0];
      scope.file = file;
      scope.$parent.file = file;
      scope.$apply();
    });
  }
}
