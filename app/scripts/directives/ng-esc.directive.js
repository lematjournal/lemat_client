import { Directive, Inject } from 'ng-forward';

@Directive({
  selector: '[ng-esc]'
})

@Inject('$scope', '$element', '$attr')
export default class NgEsc {
  constructor($scope, $element, $attr) {
    $element.bind('keydown keypress', (event) => {
      if (event.which === 27) {
        $scope.$apply(() => {
          $scope.$eval($attr.ngEsc);
        });
        event.preventDefault();
      }
    });
  };
}
