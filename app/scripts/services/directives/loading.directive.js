'use strict';

export default function lematLoading($http) {
  'ngInject';
  var directive = {
    restrict: 'A',
    link: link
  };

  return directive;

  function link(scope, elm) {
    scope.isLoading = function() {
      return $http.pendingRequests.length > 0;
    };

    scope.$watch(scope.isLoading, function(v) {
      if (v) {
        elm.show();
      } else {
        elm.hide();
      }
    });
  }
}
