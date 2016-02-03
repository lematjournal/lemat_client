'use strict';

export default function ngEsc() {
  'ngInject';
  var directive = function(scope, element, attrs) {
    element.bind('keydown keypress', function(event) {
      if (event.which === 27) {
        scope.$apply(function() {
          scope.$eval(attrs.ngEsc);
        });
        event.preventDefault();
      }
    });
  };

  return directive;

}
