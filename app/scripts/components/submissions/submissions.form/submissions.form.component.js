import SubmissionsButtons from './buttons/buttons';
import SubmissionsHeader from './header/header';
import SubmissionsInfo from './info/info';
import SubmissionsUpload from './upload/upload';
import { AsModule, Component, View } from 'a1atscript';

@AsModule('lematClient.core.submissions.form', [SubmissionsButtons, SubmissionsHeader, SubmissionsInfo, SubmissionsUpload])
@Component({
  appInjector: ['$scope', '$filter', '$http', '$q', '$rootScope', '$localStorage', '$state', '$stateParams', 'SubmissionsFactory'],
  selector: 'lemat-submission-form',
  transclude: true,
  controller: 'SubmissionsFormController',
  controllerAs: 'submissionsFormCtrl'
})
@View({
  template: '<div ng-switch="submissionsFormCtrl.state">' +
              '<lemat-submission-header bind-complete="submissionsFormCtrl.complete" bind-state="submissionsFormCtrl.state" bind-states="submissionsFormCtrl.states"></lemat-submission-header>' +
              '<lemat-submission-info bind-submission="submissionsFormCtrl.submission" ng-switch-when="info"></lemat-submission-info>' +
              '<lemat-submission-upload ng-switch-when="upload"></lemat-submission-upload>' +
              '<lemat-submission-final ng-switch-when="final"></lemat-submission-final>' +
              '<hr class="dotted">' +
              '<lemat-submission-buttons bind-state="submissionsFormCtrl.state" bind-states="submissionsFormCtrl.states" />' +
            '</div>'
})
export default class SubmissionsFormComponent {
  constructor($scope, $filter, $http, $rootScope, $localStorage, $state, $stateParams, SubmissionsFactory) {
    this.$scope = $scope;
    this.$scope.$storage = $localStorage.$default({
      submission: {},
      currentPage: {}
    });
    // this.$scope.$on('$viewContentLoaded', this.checkSubmission);

    this.submission = this.$scope.$storage.submission;
    this.complete = this.$scope.$storage.complete;
    this.currentPage = this.$scope.$storage.currentPage;


    // this.imagePopover = {
    //   templateUrl: 'image-popover.template.html'
    // };
    // this.tagPopover = {
    //   templateUrl: 'tag-popover.template.html'
    // };

    this.states = ['info', 'upload', 'final'];
    this.state = this.states[this.currentPage];
  }
}
