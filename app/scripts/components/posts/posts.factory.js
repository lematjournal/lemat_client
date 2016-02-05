import ServerUrl from '../../services/constants.module';
import 'babel-polyfill';

export default class PostsFactory {
  /*@ngInject*/
  constructor($http, $localStorage) {
    this.$http = $http;
    this.$localStorage = $localStorage;
    this.posts = [];
    this.post = {};
    this.tags = $localStorage.tags;
  }

  resetPost() {
    angular.copy({}, this.post);
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
      if (this.posts.length === 0) {
        let response = await this.$http.get(ServerUrl + '/content/posts/' + titleUrl);
        angular.copy(response.data, this.post);
      } else {
        let post = this.findPostByTitle(titleUrl);
        angular.copy(response.data, this.post);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getTags() {
    try {
      let response = await this.$http.get(ServerUrl + '/content/tags/');
      this.$localStorage.tags = response.data;
      this.$localStorage.tagsGrabDate = Date.now();
      return this.tags;
    } catch (error) {
      console.error(error);
    }
  }

  upsertPost(post) {
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

    if (post.id) {
      return this.$http.patch(ServerUrl + '/content/posts/' + post.id, params).then((response) => {
        console.log(response);
      });
    } else {
      return this.$http.post(ServerUrl + '/content/posts/', params).then((response) => {
        console.log(response);
      });
    }
  }

  findPostById(id) {
    for (let i = 0; i < this.posts.length; i += 1) {
      if (this.posts[i].id === id) return this.posts[i];
    }
  }

  findPostByTitle(titleUrl) {
    for (let i = 0; i < this.posts.length; i += 1) {
      if (this.posts[i].titleUrl === titleUrl) return this.posts[i];
    }
  }

  deletePost(id) {
    this.$http.delete(ServerUrl + '/content/posts/' + id);
    let post = this.findPostById(id);
    this.posts.splice(this.posts.indexOf(post), 1);
  }
}
