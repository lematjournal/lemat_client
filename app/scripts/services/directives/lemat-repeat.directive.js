export default function lematRepeat() {
  'ngInject';
  let directive = function(scope, element) {
    angular.element(element);
    if (scope.$last) {
      setTimeout(() => {
        scope.$emit('lastElem');
      }, 1);
    }
  };

  return directive;
}
