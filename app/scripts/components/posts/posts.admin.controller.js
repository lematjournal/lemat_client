import { Controller } from 'a1atscript';
import PostsController from './posts.controller';
import { ImageModal } from '../images/images.decorator';
import 'babel-polyfill';

@ImageModal
@Controller('PostsAdminController', ['$scope', '$rootScope', '$stateParams', '$uibModal', 'AuthFactory', 'UsersFactory', 'PostsFactory'])
export default class PostsAdminController extends PostsController {
  constructor($scope, $stateParams, $rootScope, $uibModal, AuthFactory, UsersFactory, PostsFactory) {
    super($scope, $rootScope, PostsFactory);
    this.$stateParams = $stateParams;
    this.$uibModal = $uibModal;
    this.AuthFactory = AuthFactory;
    this.UsersFactory = UsersFactory;
    this.tags = PostsFactory.tags;
    $scope.$on('selectedUser', this.selectedUser);
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

  async getUsers() {
    try {
      await this.UsersFactory.getUsers();
      this.users = this.UsersFactory.users;
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

  // crud actions

  upsertPost(post) {
    if (this.AuthFactory.isAuthenticated()) {
      this.PostsFactory.upsertPost(post);
      console.log('Post updated', 'Success');
    }
  }
}
