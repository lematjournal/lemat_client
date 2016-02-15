import { Injectable, Inject } from 'ng-forward';
import ServerUrl from '../constants.module';
import 'babel-polyfill';
import 'reflect-metadata';

@Injectable()
@Inject('$http', '$window')
export default class TagsFactory {
  constructor($http, $window) {
    this.$http = $http;
    this.$window = $window;
    this.tags = [];
  }

  _getTags() {
    try {
      return JSON.parse(this.$window.localStorage.getItem('ngStorage-tags'));
    } catch (error) {
      return false;
    }
  }

  async query() {
    try {
      if (!this._getTags() || this._getTags.length === 0) {
        let response = await this.$http.get(ServerUrl + '/content/tags/');
        this.$window.localStorage.setItem('ngStorage-tags', JSON.stringify(response.data));
        this.$window.localStorage.setItem('ngStorage-tagsGrabDate', JSON.stringify(Date.now()));
        angular.copy(response.data, this.tags);
      } else {
        let tags = JSON.parse(this.$window.localStorage.getItem('ngStorage-tags'));
        angular.copy(tags, this.tags);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
