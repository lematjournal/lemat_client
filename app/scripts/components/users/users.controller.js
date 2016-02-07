import { ImageModal } from '../images/images.decorator';
import 'babel-polyfill';

@ImageModal
export default class UsersController {
  /*@ngInject*/
  constructor($scope, $rootScope, $uibModal, $stateParams, AuthFactory, ImagesFactory, UsersFactory) {
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.$uibModal = $uibModal;
    this.$stateParams = $stateParams;
    this.master = {};
    this.users = UsersFactory.users;
    this.user = UsersFactory.user;
  }

  selectedUser($item) {
    if ($item) {
      this.$scope.$emit('selectedUser', $item.originalObject);
    }
  }

  exclude(elem) {
    return !elem.role.match(/^(admin|editor)$/);
  }

  select(event) {
    if (!angular.element(event.target).hasClass('active')) {
      angular.element(event.target).addClass('active');
    } else {
      angular.element(event.target).removeClass('active');
    }
    angular.element(event.target).siblings().removeClass('active');
  }

  async getUser() {
    try {
      await this.UsersFactory.getUser(this.$stateParams.user);
      this.user = this.UsersFactory.user;
      console.log(this.UsersFactory.user);
      angular.copy(this.user, this.master);
    } catch (error) {
      console.error(error);
    }
  }

  async getProfile() {
    try {
      await this.AuthFactory.setUser();
      this.$rootScope.session = AuthFactory.session;
      await UsersFactory.getProfile($rootScope.session)
      this.user = UsersFactory.profile;
      angular.copy(this.user, this.master);
    } catch (error) {
      console.error(error);
    }
  }

  upsertUser() {
    if (this.AuthFactory.isAuthenticated() && !angular.equals(this.user, this.master)) {
      this.UsersFactory.upsertUser(vm.user)
      console.log('User updated successfully', 'Done');
    }
  }

  deleteUser(id) {
    if (this.AuthFactory.isAuthenticated()) {
      this.UsersFactory.deleteUser(id);
    }
  }

  resetUser() {
    this.user = this.master;
    console.log('User reset to last save', 'Done');
  }

  imageModalCallback(profileImage) {
    this.user.profile_image = profileImage;
    this.upsertUser(this.user);
  }
}
