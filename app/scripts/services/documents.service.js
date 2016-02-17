import { Injectable, Inject } from 'ng-forward';
import ServerUrl from '../constants.module';
import 'babel-polyfill';
import 'reflect-metadata';

@Injectable()
@Inject('$http')
export default class DocumentsService {
  constructor($http) {
    this.$http = $http;
  }

  async convert(url) {
    try {
      let params = {
        document: {
          file: url
        }
      };
      let response = await this.$http.post(ServerUrl + '/documents/convert', params);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}
