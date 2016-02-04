export default function lematLoading() {
  'ngInject';
  return function($http) {
    var directive = {
      restrict: 'A',
      link: link
    };

    return directive;

    'ngInject';
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
}
