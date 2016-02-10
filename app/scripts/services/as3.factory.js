import { Injectable, Inject } from 'ng-forward';
import ServerUrl from '../constants.module';
import 'reflect-metadata';
import 'ng-file-upload';

@Injectable()
@Inject('$http', 'Upload')
export default class AS3Factory {
  constructor($http, Upload) {
    this.$http = $http;
    this.Upload = Upload;
  }

  async upload(file, folder) {
    try {
      let response = await this.Upload.upload({
        url: `${ServerUrl}/uploads`,
        data: {
          upload: {
            file: file,
            name: file.name,
            key: `uploads/${file.name}`,
            url: `https://s3-us-west-2.amazonaws.com/lematjournal/uploads/${file.name}`
          }
        }
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  }


  async deleteFile(key) {
    try {
      let response = await this.$http.delete(ServerUrl + '/uploads/' + key);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
