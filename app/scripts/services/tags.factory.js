import { Injectable, Inject } from 'ng-forward';
import ServerUrl from '../constants.module';
import 'babel-polyfill';
import 'reflect-metadata';

@Injectable()
@Inject('$http')
export default class TagsFactory {
  constructor($http, $window) {
    this.$http = $http;
    this.tags = [];
  }

  async query() {
    try {
      let response = await this.$http.get(ServerUrl + '/content/tags/');
      angular.copy(response.data, this.tags);
    } catch (error) {
      console.error(error);
    }
  }
}
