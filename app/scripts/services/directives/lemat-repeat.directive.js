'use strict';

export default function lematRepeat() {
  var directive = function(scope, element) {
    angular.element(element);
    if (scope.$last) {
      setTimeout(function() {
        scope.$emit('lastElem');
      }, 1);
    }
  };

  return directive;
}
