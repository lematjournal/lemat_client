import { Component, View } from 'a1atscript';

@Component({
  appInjector: ['$scope'],
  selector: 'lemat-submission-buttons',
  properties: {
    'states' : 'states',
    'state' : 'state'
  }
})
@View({
  templateUrl: './scripts/components/submissions/submissions.form/buttons/buttons.html'
})
export default class SubmissionsButtons {
  constructor($scope) {
    this.$scope = $scope;
  }

  next() {
    if (this.$scope.$parent.$storage.currentPage < this.states.length - 1) {
      this.$scope.$parent.$storage.currentPage += 1;
      this.state = this.states[this.$scope.$parent.$storage.currentPage];
    }
  }

  back() {
    if (this.$scope.$parent.$storage.currentPage > 0) {
      this.$scope.$parent.$storage.currentPage -= 1;
      this.state = this.states[this.$scope.$parent.$storage.currentPage];
    }
  }
}
