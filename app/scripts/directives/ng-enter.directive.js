import { Directive, Inject } from 'ng-forward';

@Directive({
  selector: '[ng-enter]'
})

@Inject('$scope', '$element', '$attr')
export default class NgEnter {
  constructor($scope, $element, $attr) {
    $element.bind('keydown keypress', (event) => {
      if (event.which === 13) {
        $scope.$apply(() => {
          $scope.$eval($attr.ngEnter);
        });
        event.preventDefault();
      }
    });
  };
}
