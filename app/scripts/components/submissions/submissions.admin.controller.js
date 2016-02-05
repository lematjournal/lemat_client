import ServerUrl from '../../services/constants.module';
import 'babel-polyfill';

export default class SubmissionsAdminController {
  /*@ngInject*/
  constructor($scope, $http, $filter, $q, $uibModal, $rootScope, $stateParams, AuthFactory, SubmissionsFactory, PostsFactory, UsersFactory) {
    this.$scope = $scope;
    this.$http = $http;
    this.$filter = $filter;
    this.$q = $q;
    this.$uibModal = $uibModal;
    this.$rootScope = $rootScope;
    this.$stateParams = $stateParams;
    this.AuthFactory = AuthFactory;
    this.SubmissionsFactory = SubmissionsFactory;
    this.PostsFactory = PostsFactory;
    this.UsersFactory = UsersFactory;
    this.userId = AuthFactory.session.id;
    this.submission = this.SubmissionsFactory.submission;
    this.disabled = [];
    this.editors = UsersFactory.users.filter((user) => {
      if (user.role.match(/^(admin|editor)$/)) {
        return user;
      }
    });
  }

  // AuthFactory.setUser(); <-- move to router

  getNumber(num) {
    return new Array(num);
  }

  async getSubmission() {
    await this.SubmissionsFactory.getSubmission(this.$stateParams.submission);
    this.submission = this.SubmissionsFactory.submission;
    console.log(this.submission);
      //            if (this.submission.submission_type === 'text') {
      //               this.convertDocxToHtml();
      //            } else if (this.submission.submission_type === 'image') {
      //               this.images = JSON.parse(this.submission.attachments);
      //               console.log(this.images);
      //            }
  }

  async getSubmissions() {
    try {
      await this.SubmissionsFactory.getSubmissions();
      this.submissions = this.SubmissionsFactory.submissions;
    } catch (error) {
      console.error(error);
    }
  }

  async getAcceptedSubmissions() {
    try {
      await this.SubmissionsFactory.getAcceptedSubmissions();
      this.acceptedSubmissions = this.SubmissionsFactory.acceptedSubmissions;
    } catch (error) {
      console.error(error);
    }
  }

  async getPendingSubmissions() {
    try {
      await this.SubmissionsFactory.getPendingSubmissions();
      this.pendingSubmissions = this.SubmissionsFactory.pendingSubmissions;
    } catch (error) {
      console.error(error);
    }
  }

  async getPendingSubmissions() {
    try {
      await this.SubmissionsFactory.getPendingSubmissions();
      this.pendingSubmissions = this.SubmissionsFactory.pendingSubmissions;
    } catch (error) {
      console.error(error);
    }
  }

  async getCurrentRoundSubmissions() {
    try {
      await this.SubmissionsFactory.getCurrentRoundSubmissions();
      this.currentSubmissions = this.SubmissionsFactory.currentSubmissions;
      if (this.currentSubmissions) {
        this.querySubmissions(this.currentSubmissions);
      }
    } catch (error) {
      console.error(error);
    }
  }

  upsertSubmission() {
    let submission = {
      attachments: this.submission.attachments,
      email_address: this.submission.email_address,
      email_content: this.submission.email_content,
      submission_type: this.submission.submission_type,
      tag_names: this.submission.tags,
      title: this.submission.title,
      uid: this.submission.uid,
      user: {
        username: this.submission.username
      }
    };
    this.SubmissionsFactory.upsertSubmission(submission)
  }

  async getTags() {
    try {
      await this.PostsFactory.getTags();
      this.tags = this.PostsFactory.tags;
    } catch (error) {
      console.error(error);
    }
  }


  querySubmissions(submissions) {
    // need to find a faster way to do this
    // iterate through submissions...
    for (let i = 0; submissions.length > i; i += 1) {
      // iterate through votes array
      for (let j = 0; submissions[i].votes_array.length > j; j += 1) {
        console.log('submission: ', this.submissions[i].uid, ' : ', this.submissions[i].votes_array[j].user_id === this.userId);
        if (this.submissions[i].votes_array[j].user_id === this.userId) {
          this.disabled[i] = true;
        }
      }
    }
  };

  // this should be moved to a service to stop duplication...
  convertDocxToHtml() {
    let deferred = this.$q.defer();
    let params = {
      submission: {
        document: this.$filter('filterDocs')(this.submission.attachments)[0]
      }
    };
    this.$http.post(ServerUrl + '/submissions/render-doc', params).then((response) => {
      this.doc = response.data;
      console.log('You can edit your submission in the browser.', 'Preview Generated');
      deferred.resolve(this.doc);
    }, (errors) => {
      console.log(errors);
      deferred.reject(errors);
      console.error('This happens when the file format contains irregular data, we\'re working on being able to generate previews in all cases.', 'Could not generate preview');
    });
    return deferred.promise;
  };

  submissionModal(submissionIndex) {
    this.$uibModalInstance = this.$uibModal.open({
      templateUrl: 'scripts/admin/submissions/submissions.vote.modal/submissions.vote.modal.html',
      controller: 'SubmissionsVoteModalController',
      controllerAs: 'submissionsVoteModalCtrl',
      size: 'lg',
      resolve: {
        submission: () => {
          return this.currentSubmissions[submissionIndex];
        }
      }
    });

    this.$uibModalInstance.result.then((submission) => {
      this.currentSubmissions[submissionIndex] = submission;
      this.SubmissionsFactory.updateVotes(this.currentSubmissions[submissionIndex]);
      this.querySubmissions(this.currentSubmissions);
    });
  }

  submissionModal(index) {
    if (this.disabled[index] === false) {
      this.submissionModal(index);
    }
  }

  deleteSubmission(id) {
    this.SubmissionsFactory.deleteSubmission(id);
  }
}
