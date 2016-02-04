'use strict';

export default function scrollPosition() {
  'ngInject';
  return function($document) {
    var directive = {
      scope: {
        scroll: '=scrollPosition'
      },
      link: link
    };

    return directive;

    function link(scope, element) {
      var windowEl = angular.element($document);
      var handler = function() {
        scope.scroll = windowEl.scrollTop();
      };
      windowEl.on('scroll', scope.$apply.bind(scope, handler));
      handler();
    }
  }
}
