import ServerUrl from '../../services/constants.module';

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

  getPosts() {
    return this.$http.get(ServerUrl + '/content/posts/').then((response) => {
      angular.copy(response.data, this.posts);
    });
  }

  getPost(titleUrl) {
    return this.$http.get(ServerUrl + '/content/posts/' + titleUrl).then((response) => {
      angular.copy(response.data, this.post);
    });
  }

  getTags() {
    let promise = this.$http.get(ServerUrl + '/content/tags/').then((response) => {
      this.$localStorage.tags = response.data;
      this.$localStorage.tagsGrabDate = Date.now();
      return this.tags;
    });

    return promise;
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

  findPostIndexById(id) {
    for (let i = 0; i < this.posts.length; i++) {
      if (this.posts[i].id === id) {
        return i;
      }
    }
  }

  deletePost(id) {
    return this.$http.delete(ServerUrl + '/content/posts/' + id).then(() => {
      this.posts.splice(this.findPostIndexById(id), 1);
    });
  }
}
