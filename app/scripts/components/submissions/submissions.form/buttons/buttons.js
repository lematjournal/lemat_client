import { Component, EventEmitter, Inject, Input, Output } from 'ng-forward';
import 'reflect-metadata';

@Component({
  controllerAs: 'submissionButtons',
  selector: 'lemat-submission-buttons',
  templateUrl: './scripts/components/submissions/submissions.form/buttons/buttons.html',
  inputs: ['states', 'state'],
  outputs: ['submit']
})

@Inject('$scope', '$element')
export default class SubmissionsButtons {
  @Input() states;
  @Input() state;
  @Output() submit = new Event('submit', { bubbles: true });
  constructor($scope, $element) {
    this.$scope = $scope;
    this.$element = $element;
    this.submit = new EventEmitter();
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

  triggerSubmit(event) {
    console.log(event);
    this.submit.next();
  }
}
