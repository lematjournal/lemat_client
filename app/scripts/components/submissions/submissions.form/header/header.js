import { Component, View } from 'a1atscript';

@Component({
  appInjector: ['$scope'],
  selector: 'lemat-submission-header',
  properties: {
    'complete' : 'complete',
    'states' : 'states',
    'state' : 'state'
  }
})
@View({
  templateUrl: './scripts/components/submissions/submissions.form/header/header.html'
})
export default class SubmissionsHeader {
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
