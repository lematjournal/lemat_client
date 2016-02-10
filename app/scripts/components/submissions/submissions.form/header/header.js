import { Component, Inject, Input } from 'ng-forward';
import 'reflect-metadata';

@Component({
  controllerAs: 'submissionHeader',
  selector: 'lemat-submission-header',
  templateUrl: './scripts/components/submissions/submissions.form/header/header.html',
  inputs: ['currentPage', 'states', 'state']
})

@Inject('$scope')
export default class SubmissionsHeader {
  @Input() complete;
  @Input() states;
  @Input() state;

  constructor($scope) {
    this.$scope = $scope;
    this.currentPage = this.$scope.$parent.$storage.currentPage;
  }

  goTo(page) {
    this.currentPage = page;
    this.$scope.$parent.$storage.currentPage = page;
    this.state = this.states[this.$scope.$parent.$storage.currentPage];
  }
}
