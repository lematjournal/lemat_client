import { Controller } from 'a1atscript';
import PostsComponent from './posts.component';
import { ImageModal } from '../images/images.decorator';
import 'babel-polyfill';

@ImageModal
@Controller('PostsAdminController', ['$scope', '$rootScope', '$stateParams', '$uibModal', 'AuthFactory', 'UsersFactory', 'PostsFactory'])
export default class PostsAdminController extends PostsComponent {
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

  resetPost() {
    angular.copy({}, this.post);
  }

  selectedUser(event, data) {
    this.post.user_id = data.id;
  }

  upsertPost(post) {
    if (this.AuthFactory.isAuthenticated()) {
      this.PostsFactory.upsertPost(post);
      console.log('Post updated', 'Success');
    }
  }
}
