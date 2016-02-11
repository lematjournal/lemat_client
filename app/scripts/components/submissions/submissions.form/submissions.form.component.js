import SubmissionsButtons from './buttons/buttons';
import SubmissionsFactory from '../submissions.factory';
import SubmissionsHeader from './header/header';
import SubmissionsInfo from './info/info';
import SubmissionsReview from './review/review';
import SubmissionsUpload from './upload/upload';
import { Component, Input, Inject } from 'ng-forward';

import 'ngstorage';
import 'reflect-metadata';

@Component({
  selector: 'submission-form',
  controllerAs: 'submissionsCtrl',
  directives: [SubmissionsButtons, SubmissionsHeader, SubmissionsInfo, SubmissionsReview, SubmissionsUpload],
  providers: ['ngStorage', SubmissionsFactory],
  templateUrl: './scripts/components/submissions/submissions.form/form.html'
})

@Inject('$localStorage', '$rootScope', '$scope', SubmissionsFactory)
export default class SubmissionsForm {
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
    this.SubmissionsFactory = SubmissionsFactory;
  }

  /**
   * Posts submission and clears $localStorage values.
   * Redirects to 'thank you' view
   */
  async submit() {
    console.log(this.submission);
    try {
      let response = ::this.SubmissionsFactory.upsertSubmission(this.submission);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
}
