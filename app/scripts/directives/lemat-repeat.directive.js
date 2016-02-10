import { Directive, Inject } from 'ng-forward';

@Directive({
  selector: '[lemat-repeat]'
})

@Inject('$scope, $element')
export default class LematRepeat {
  constructor($scope, $element) {
    if ($scope.$last) {
      setTimeout(() => {
        $scope.$emit('lastElem');
      }, 1);
    }
  };
}
