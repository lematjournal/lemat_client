import { Injectable, Inject } from 'ng-forward';
import ServerUrl from '../../constants.module';
import slug from 'slug';
import 'babel-polyfill';
import 'reflect-metadata';

@Injectable()
@Inject('$filter', '$http')
export default class IssuesFactory {
  constructor($filter, $http) {
    this.$filter = $filter;
    this.$http = $http;
    this.issues = [];
    this.issue = {};
    this.pieces = [];
  }

  async delete(id) {
    try {
      await this.$http.delete(ServerUrl + '/content/issues/' + id);
      this.issues.splice(this.findById(id), 1);
    } catch (error) {
      console.error(error);
    }
  }


  findById(id) {
    for (let i = 0; this.issues.length - 1 > i; i += 1) {
      if (this.issues[i].id === id) {
        return i;
      }
    }
  }

  async get(id) {
    try {
      let response = await this.$http.get(ServerUrl + '/content/issues/' + id);
      return angular.copy(response.data, this.issue);
    } catch (error) {
      console.error(error);
    }
  }

  async query() {
    try {
      let response = await this.$http.get(ServerUrl + '/content/issues/');
      angular.copy(response.data, this.issues);
      // let latest = this.$filter('orderBy')(response.data, '-created_at')[0];
      // angular.copy(latest, this.issue);
    } catch (error) {
      console.error(error);
    }
  }

  reset() {
    angular.copy({}, this.issue);
  }

  async upsert(issue) {
    let params = {
      issue: {
        title: issue.title,
        image_url: issue.image_url,
        download_link: issue.download_link
      }
    };

    try {
      if (issue.id) {
        let response = await this.$http.patch(ServerUrl + '/content/issues/' + issue.id, params);
      } else {
        let response = await this.$http.post(ServerUrl + '/content/issues/', params);
        this.issues.push(response.data);
      }
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
}
