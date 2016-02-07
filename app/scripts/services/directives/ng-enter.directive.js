export default function ngEnter() {
  'ngInject';
  let directive = (scope, element, attrs) => {
    element.bind('keydown keypress', (event) => {
      if (event.which === 13) {
        scope.$apply(() => {
          scope.$eval(attrs.ngEnter);
        });
        event.preventDefault();
      }
    });
  };
  return directive;
}
