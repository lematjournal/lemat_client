import { Service } from 'a1atscript';
import ServerUrl from '../../services/constants.module';
import 'babel-polyfill';

@Service('SubmissionsFactory', ['$http'])
export default class SubmissionsFactory {
  constructor($http) {
    this.$http = $http;
    this.acceptedSubmissions = [];
    this.comment = {};
    this.currentSubmissions = [];
    this.pendingSubmissions = [];
    this.rounds = [];
    this.submissions = [];
    this.submission = [];
  }

  /**
   * Posts an Html string to the back-end to convert it to a ".docx" file
   * @param   {String} htmlString  Html string taken from vm.doc
   * @param   {String} fileName  randomly generated unique filename
   * @returns {String} Amazon S3 key of the uploaded file
   */
  async convertHtmlToDocx(htmlString, fileName) {
    let params = {
      submission: {
        document: htmlString,
        title: fileName
      }
    };
    try {
      let response = await this.$http.post(ServerUrl + '/submissions/convert-doc', params);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Sends '.docx' attachment url to the back-end where it is retrieved and converted to html
   * @returns {Object} Promise containing a string of the converted html
   */
  async convertDocxToHtml() {
    let params = {
      submission: {
        document: $filter('filterDocs')(this.submission.attachments)[0]
      }
    };
    try {
      let response = await this.$http.post(ServerUrl + '/submissions/render-doc', params);
      this.doc = response.data;
      console.log('You can edit your submission in the browser.', 'Preview Generated');
      return this.doc;
    } catch (error) {
      console.error(errors);
    }
  }

  async getAcceptedSubmissions() {
    try {
      let response = await this.$http.get(ServerUrl + '/voting/accepted');
      angular.copy(response.data, this.acceptedSubmissions);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Returns submissions currently under vote.
   * Assigns the time remaining the voting round
   * @returns {Array} Array of submissions currently under vote
   */
  async getCurrentRoundSubmissions() {
    try {
      let response = await this.$http.get(ServerUrl + '/voting/current');
      let modifiedResponse = this.setDates(response.data);
      angular.copy(modifiedResponse, this.currentSubmissions);
    } catch (error) {
      console.error(error);
    }
  }

  async getPendingSubmissions() {
    try {
      let response = await this.$http.get(ServerUrl + '/voting/pending');
      angular.copy(response.data, this.pendingSubmissions);
    } catch (error) {
      console.error(error);
    }
  }

  async getSubmissions() {
    try {
      let response = await this.$http.get(ServerUrl + '/submissions/');
      return angular.copy(response.data, this.submissions);
    } catch (error) {
      console.error(error);
    }
  }

  async getSubmission(uid) {
    try {
      let response = await this.$http.get(ServerUrl + '/submissions/' + uid);
      angular.copy(response.data, this.submission);
    } catch (error) {
      console.error(error);
    }
  }

  async upsertComment(commentHash) {
    let params = {
      comment: commentHash
    };
    try {
      let response = await this.$http.post(ServerUrl + '/submissions/comments', params);
      angular.copy(response.data, this.comment);
      console.log('comment: ', this.comment);
    } catch (error) {
      console.error(error);
    }
  }

  async upsertSubmission(submission) {
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
    try {
      if (submission.uid) {
        let response = await this.$http.patch(ServerUrl + '/submissions/' + submission.uid, params);
        angular.copy(response.data, this.submission);
      } else {
        let response = await this.$http.post(ServerUrl + '/submissions/', params);
        angular.copy(response.data, this.submission);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async updateVotes(submission) {
    let params = {
      submission: {
        votes_array: submission.votes_array,
        user_ids: submission.user_ids
      }
    };
    try {
      let response = await this.$http.patch(ServerUrl + '/voting/' + submission.uid, params);
      angular.copy(response.data, this.submission);
    } catch (error) {
      console.error(error);
    }
  }

  setDates(responseData) {
    let newData = [];
    responseData.map((obj) => {
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

  async getRounds() {
    try {
      let response = await this.$http.get(ServerUrl + '/voting/rounds');
      angular.copy(response.data, rounds);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteSubmission(id) {
    try {
      await this.$http.delete(ServerUrl + '/submissions/' + id);
      this.pendingSubmissions.splice(this.findSubmissionIndexById(id), 1);
    } catch (error) {
      console.error(error);
    }
  }

  findSubmissionIndexById(id) {
    for (let i = 0; i < this.pendingSubmissions.length; i++) {
      if (this.pendingSubmissions[i].id === id) {
        return i;
      }
    }
  }
}
