import ServerUrl from '../../services/constants.module';
import slug from 'slug';
import 'babel-polyfill';

export default class IssuesFactory {
  /*@ngInject*/
  constructor($http, $window) {
    this.$http = $http;
    this.$window = $window;
    this.issues = [];
    this.issue = {};
    this.pieces = [];
  }

  resetIssue() {
    angular.copy({}, this.issue);
  }

  async getIssues() {
    try {
      let response = await this.$http.get(ServerUrl + '/content/issues/');
      angular.copy(response.data, this.issues);
    } catch (error) {
      console.error(error);
    }
  }

  async getIssue(id) {
    try {
      let response = await this.$http.get(ServerUrl + '/content/issues/' + id);
      angular.copy(response.data, this.issue);
    } catch (error) {
      console.error(error);
    }
  }

  upsertIssue(issue) {
    let params = {
      issue: {
        title: issue.title,
        image_url: issue.image_url,
        download_link: issue.download_link
      }
    };

    if (issue.id) {
      return this.$http.patch(ServerUrl + '/content/issues/' + issue.id, params).then((response) => {
        this.getIssue(response.data.id);
      });
    } else {
      return this.$http.post(ServerUrl + '/content/issues/', params).then((response) => {
        this.issues.push(response.data);
      });
    }
  }

  findIssueById(id) {
    for (let i = 0; this.issues.length - 1 > i; i += 1) {
      if (this.issues[i].id === id) {
        console.log('found');
        return this.issues[i];
      }
    }
  }

  deleteIssue(id, titleUrl) {
    try {
      this.$http.delete(ServerUrl + '/content/issues/' + titleUrl);
      let issue = this.findIssueById(id);
      this.issues.splice(this.issues.indexOf(issue), 1);
    } catch (error) {
      console.error(error);
    }
  }

  getIssuePieces(issueId) {
    return this.$http.get(ServerUrl + '/content/issues/' + issueId + '/pieces').then((response) => {
      angular.copy(response.data, this.pieces);
    });
  }

  uploadIssueImage(image) {
    let params = {
      image: {
        image_url: image.imageUrl,
        user_id: image.userId,
        issue_id: image.issueId
      }
    };
    return this.$http.post(ServerUrl + '/content/images/', params).then((response) => {
      angular.copy(response.data, this.image);
    });
  }
}
