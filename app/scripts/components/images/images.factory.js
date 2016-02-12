import { Injectable, Inject } from 'ng-forward';
import ServerUrl from '../../constants.module';
import 'babel-polyfill';

@Injectable()
@Inject('$http')
export default class ImagesFactory {
  constructor($http) {
    this.images = [];
    this.image = {};
    this.$http = $http;
  }

  async getImages() {
    try {
      let response = await this.$http.get(ServerUrl + '/content/images/');
      return angular.copy(response.data, this.images);
    } catch (error) {
      console.error(error);
    }
  }

  deleteImage(id) {
    return this.$http.delete(ServerUrl + '/content/images/' + id)
  }

  async uploadImage(image) {
    console.log('input image', image);
    let params = {
      image: {
        credits: images.credits,
        image_url: image.image_url,
        user_id: image.user_id
      }
    };
    console.log('params', params);
    try {
      let response = await this.$http.post(ServerUrl + '/content/images/', params);
      angular.copy(response.data, this.image);
    } catch (error) {
      console.error(error);
    }
  }
}
