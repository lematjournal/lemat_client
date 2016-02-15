import { Directive, Inject } from 'ng-forward';

@Directive({
  selector: '[lemat-repeat]'
})

@Inject('$scope')
export default class LematRepeat {
  constructor($scope) {
    if ($scope.$last) {
      setTimeout(() => {
        $scope.$emit('lastElem');
      }, 100);
    }
  };
}
