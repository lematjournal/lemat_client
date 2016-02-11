import { Injectable, Inject } from 'ng-forward';
import ServerUrl from '../../constants.module';
import 'babel-polyfill';
import 'reflect-metadata';

@Injectable()
@Inject('$http', '$window')
export default class PostsFactory {
  constructor($http, $window) {
    this.$http = $http;
    this.posts = [];
    this.post = {};
    // this.tags = $localStorage.tags;
  }

  deletePost(id) {
    try {
      this.$http.delete(ServerUrl + '/content/posts/' + id);
      let post = this.findPostById(id);
      this.posts.splice(this.posts.indexOf(post), 1);
    } catch (error) {
      console.error(error);
    }
  }

  findPostById(id) {
    for (let i = 0; i < this.posts.length; i += 1) {
      if (this.posts[i].id === id) return this.posts[i];
    }
  }

  async getPosts() {
    try {
      let response = await this.$http.get(ServerUrl + '/content/posts/');
      angular.copy(response.data, this.posts);
    } catch (error) {
      console.error(error);
    }
  }

  async getPost(titleUrl) {
    try {
      let response = await this.$http.get(ServerUrl + '/content/posts/' + titleUrl);
      angular.copy(response.data, this.post);
    } catch (error) {
      console.error(error);
    }
  }

  async getTags() {
    try {
      if (JSON.parse($window.localStorage.getItem('ngStorage-tags')).length === 0) {
        let response = await this.$http.get(ServerUrl + '/content/tags/');
        this.$window.localStorage.setItem('ngStorage-tags', JSON.stringify(response.data));
        this.$window.localStorage.setItem('ngStorage-tags-GrabDate', JSON.stringify(Date.now()));
        return response.data;
      } else {
        return JSON.parse(this.$window.localStorage.getItem('ngStorage-tags'));
      }
    } catch (error) {
      console.error(error);
    }
  }

  resetPost() {
    angular.copy({}, this.post);
  }

  async upsertPost(post) {
    let params = {
      post: {
        title: post.title,
        tag_names: post.tags,
        user_id: post.user_id,
        content: post.content,
        post_type: post.post_type,
        preview: post.preview,
        title_url: post.title_url
      }
    };
    try {
      if (post.id) {
        let response = await this.$http.patch(ServerUrl + '/content/posts/' + post.id, params);
        angular.copy(response.data, this.post);
      } else {
        let response = await this.$http.post(ServerUrl + '/content/posts/', params);
        angular.copy(response.data, this.post);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
