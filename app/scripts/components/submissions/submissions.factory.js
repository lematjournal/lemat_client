import ServerUrl from '../../services/constants.module';

export default class SubmissionsFactory {
  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
    this.acceptedSubmissions = [];
    this.comment = {};
    this.currentSubmissions = [];
    this.pendingSubmissions = [];
    this.rounds = [];
    this.submissions = [];
    this.submission = {};
  }

  getAcceptedSubmissions() {
    return this.$http.get(ServerUrl + '/voting/accepted').then((response) => {
      angular.copy(response.data, this.acceptedSubmissions);
    });
  }

  /**
   * Returns submissions currently under vote.
   * Assigns the time remaining the voting round
   * @returns {Array} Array of submissions currently under vote
   */
  getCurrentRoundSubmissions() {
    return this.$http.get(ServerUrl + '/voting/current').then((response) => {
      let modifiedResponse = setDates(response.data);
      angular.copy(modifiedResponse, this.currentSubmissions);
    });
  }

  getPendingSubmisions() {
    return this.$http.get(ServerUrl + '/voting/pending').then((response) => {
      angular.copy(response.data, this.pendingSubmissions);
    });
  }

  getSubmissions() {
    return this.$http.get(ServerUrl + '/submissions/').then((response) => {
      angular.copy(response.data, this.submissions);
    });
  }

  getSubmission(uid) {
    return this.$http.get(ServerUrl + '/submissions/' + uid).then((response) => {
      angular.copy(response.data, this.submission);
    });
  }

  upsertSubmission(submission) {
    let params = {
      submission: {
        attachments: submission.attachments,
        email_address: submission.email_address,
        email_content: submission.email_content,
        submission_type: submission.submission_type,
        tag_names: submission.tags,
        title: submission.title,
        username: submission.user.username
      }
    };
    if (submission.uid) {
      return this.$http.patch(ServerUrl + '/submissions/' + submission.uid, params).then((response) => {
        angular.copy(response.data, this.submission);
      });
    } else {
      return this.$http.post(ServerUrl + '/submissions/', params).then((response) => {
        angular.copy(response.data, this.submission);
      });
    }
  }

  upsertComment(commentHash) {
    let params = {
      comment: commentHash
    };
    return this.$http.post(ServerUrl + '/submissions/comments', params).then((response) => {
      angular.copy(response.data, this.comment);
      console.log('comment: ', this.comment);
    });
  }

  updateVotes(submission) {
    let params = {
      submission: {
        votes_array: submission.votes_array,
        user_ids: submission.user_ids
      }
    };

    return this.$http.patch(ServerUrl + '/voting/' + submission.uid, params).then((response) => {
      angular.copy(response.data, this.submission);
    });
  }

  setDates(responseData) {
    let newData = [];
    angular.forEach(responseData, (obj) => {
      let date = new Date(obj.end_date);
      let time = new Date();
      let timeRemaining = (date.valueOf() - time.getTime().valueOf());
      timeRemaining = timeRemaining.toString();
      timeRemaining = timeRemaining.substring(0, timeRemaining.length - 3);
      timeRemaining = parseInt(timeRemaining);
      obj.end_date = timeRemaining;
      newData.push(obj);
    });
    return newData;
  }

  getRounds() {
    return this.$http.get(ServerUrl + '/voting/rounds').then((response) => {
      angular.copy(response.data, rounds);
    });
  }

  deleteSubmission(id) {
    return this.$http.delete(ServerUrl + '/submissions/' + id).then(() => {
      this.pendingSubmissions.splice(findSubmissionIndexById(id), 1);
    });
  }

  findSubmissionIndexById(id) {
    for (let i = 0; i < this.pendingSubmissions.length; i++) {
      if (this.pendingSubmissions[i].id === id) {
        return i;
      }
    }
  }
}
