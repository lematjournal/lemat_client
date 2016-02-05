// import PostsController from './posts.controller';
import { ImageModal } from '../images/images.decorator';
import 'babel-polyfill';

@ImageModal
export default class PostsAdminController {
  /*@ngInject*/
  constructor($scope, $stateParams, $uibModal, AuthFactory, UsersFactory, PostsFactory) {
    this.$scope = $scope;
    this.$stateParams = $stateParams;
    this.$uibModal = $uibModal;
    this.AuthFactory = AuthFactory;
    this.PostsFactory = PostsFactory;
    this.UsersFactory = UsersFactory;
    this.posts = PostsFactory.posts;
    this.post = PostsFactory.post;
    this.tags = PostsFactory.tags;
    $scope.$on('selectedUser', this.selectedUser);
  }

  async getPost() {
    try {
      await this.PostsFactory.getPost(this.$stateParams.post);
      this.post = PostsFactory.post;
    } catch (error) {
      console.error(error);
    }
  }

  async getPosts() {
    try {
      await this.PostsFactory.getPosts();
      this.posts = this.PostsFactory.posts;
    } catch (error) {
      console.error(error);
    }
  }

  resetPost() {
    angular.copy({}, this.post);
  }

  selectedUser(event, data) {
    this.post.user_id = data.id;
  }

  async getUsers() {
    try {
      await this.UsersFactory.getUsers();
      this.users = this.UsersFactory.users;
    } catch (error) {
      console.error(error);
    }
  }

  // crud actions

  upsertPost(post) {
    if (this.AuthFactory.isAuthenticated()) {
      this.PostsFactory.upsertPost(post);
      console.log('Post updated', 'Success');
    }
  }

  deletePost(id) {
    if (this.AuthFactory.isAuthenticated()) {
      this.PostsFactory.deletePost(id);
      this.posts.splice(this.findPostById(id), 1);
    }
  }

  findPostById(id) {
    for (let i = 0; i < this.posts.length; i++) {
      if (this.posts[i].id === id) {
        return this.posts[i].id;
      }
    }
  }
}
