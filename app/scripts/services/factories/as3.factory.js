import { Service } from 'a1atscript';
import ServerUrl from '../constants.module';

@Service('AS3Factory', ['$http', 'Upload'])
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

  encode(file, callback) {
    console.log(file);
    let reader = new FileReader();
    reader.onload = function(file) {
      console.log(file.result);
      return callback(file.result);
    };
    reader.readAsDataURL(file);
  }

  parseDataUrl(url) {
    console.log(url);
    let matches = url.match(/^data:.+\/(.+);base64,(.*)$/);
    let ext = matches[1];
    let base64Data = matches[2];
    let buffer = new Buffer(base64Data, 'base64');
    return buffer;
  }
}
