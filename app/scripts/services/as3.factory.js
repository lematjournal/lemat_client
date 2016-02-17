import { Injectable, Inject } from 'ng-forward';
import ServerUrl from '../constants.module';
import slug from 'slug';
import 'babel-polyfill';
import 'ng-file-upload';
import 'reflect-metadata';

@Injectable()
@Inject('$http', 'Upload')
export default class AS3Factory {
  constructor($http, Upload) {
    this.$http = $http;
    this.Upload = Upload;
  }

  async upload(file, folder) {
    let fileName = file.name.substr(0, file.name.lastIndexOf('.'));
    let ext = file.name.substr((~-file.name.lastIndexOf('.') >>> 0) + 1);
    try {
      let response = await this.Upload.upload({
        url: `${ServerUrl}/uploads`,
        data: {
          upload: {
            file: file,
            name: fileName,
            key: `uploads/${slug(fileName)}${ext}`,
            url: `https://s3-us-west-2.amazonaws.com/lematjournal/uploads/${slug(fileName)}${ext}`
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
