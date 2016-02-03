import ServerUrl from '../../services/constants.module';
import slug from 'slug';

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

  getIssues() {
    return this.$http.get(ServerUrl + '/content/issues/').then((response) => {
      angular.copy(response.data, this.issues);
    });
  }

  getIssue(id) {
    return this.$http.get(ServerUrl + '/content/issues/' + id).then((response) => {
      angular.copy(response.data, this.issue);
    });
    console.log(this.issue)
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

  findIssueIndexById(id) {
    for (let i = 0; i < this.issues.length; i++) {
      if (this.issues[i].id === id) {
        return i;
      }
    }
  }

  deleteIssue(id, titleUrl) {
    return this.$http.delete(ServerUrl + '/content/issues/' + titleUrl).then(() => {
      this.issues.splice(this.findIssueIndexById(id), 1);
    });
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
