import SubmissionsButtons from './buttons/buttons';
import SubmissionsHeader from './header/header';
import SubmissionsInfo from './info/info';
import SubmissionsReview from './review/review';
import SubmissionsUpload from './upload/upload';
import { AsModule, Component, View } from 'a1atscript';

@AsModule('lematClient.core.submissions.form', [SubmissionsButtons, SubmissionsHeader, SubmissionsInfo, SubmissionsReview, SubmissionsUpload])
@Component({
  appInjector: ['$localStorage', '$rootScope', '$scope', '$stateParams', 'SubmissionsFactory'],
  selector: 'lemat-submission-form',
  transclude: true,
  controller: 'SubmissionsFormController',
  controllerAs: 'submissionsFormCtrl'
})
@View({
  template: '<div ng-switch="submissionsFormCtrl.state">' +
              '<lemat-submission-header bind-complete="submissionsFormCtrl.complete" bind-state="submissionsFormCtrl.state" bind-states="submissionsFormCtrl.states"></lemat-submission-header>' +
              '<lemat-submission-info bind-submission="submissionsFormCtrl.submission" ng-switch-when="info"></lemat-submission-info>' +
              '<lemat-submission-upload bind-submission="submissionsFormCtrl.submission" ng-switch-when="upload"></lemat-submission-upload>' +
              '<lemat-submission-review bind-submission="submissionsFormCtrl.submission" ng-switch-when="review"></lemat-submission-review>' +
              '<lemat-submission-final ng-switch-when="final"></lemat-submission-final>' +
              '<hr class="dotted">' +
              '<lemat-submission-buttons bind-state="submissionsFormCtrl.state" bind-states="submissionsFormCtrl.states" />' +
            '</div>'
})
export default class SubmissionsFormComponent {
  constructor($localStorage, $rootScope, $scope, $stateParams, SubmissionsFactory) {
    this.$scope = $scope;
    this.$scope.$storage = $localStorage.$default({
      complete: false,
      currentPage: 0,
      submission: {
        attachments: [],
        description: null,
        submission_type: null,
        user: {
          email: null,
          username: null
        }
      }
    });

    this.submission = this.$scope.$storage.submission;
    this.complete = this.$scope.$storage.complete;
    this.currentPage = this.$scope.$storage.currentPage;
    this.states = ['info', 'upload', 'review', 'final'];
    this.state = this.states[this.currentPage];
  }
}
