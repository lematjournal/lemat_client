import { ImageModal } from '../images/images.decorator';
import 'babel-polyfill';

@ImageModal
export default class ProfileController {
  /*@ngInject*/
  constructor($scope, $rootScope, $uibModal, $location, $stateParams, AuthFactory, UsersFactory) {
    this.user = {};
    this.master = {};
    this.fields = {};
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.$uibModal = $uibModal;
    this.$location = $location;
    this.$stateParams = $stateParams;
    this.AuthFactory = AuthFactory;
    this.UsersFactory = UsersFactory;
    $scope.popover = {
      templateUrl: 'popoverTemplate.html',
    };
  }

  async getProfile() {
    try {
      this.user = await this.UsersFactory.getUser(this.$stateParams.profile);
    } catch (error) {
      console.error(error);
    }
  }

  async getUserProfile() {
    try {
      await this.AuthFactory.setUser();
      this.$rootScope.session = this.AuthFactory.session;
      await this.UsersFactory.getProfile(this.$rootScope.session);
      this.user = this.UsersFactory.profile;
      angular.copy(this.user, this.master);
    } catch (error) {
      console.error(error);
    }
  }

  imageModalCallback(image) {
    this.user.profile_image = image;
    this.upsertProfile(this.user);
  }

  reset(event) {
    if (event.keyCode === 27) {
      this.userForm.$rollbackViewValue();
    }
  }

  resetProfile() {
    this.user = this.master;
    toastr.info('User reset to last save', 'Done');
  }

  save(event, field, user) {
    this.fields[field] = !this.fields[field];
    this.upsertProfile(user);
  }

  upsertProfile(user) {
    if (this.AuthFactory.isAuthenticated() && !angular.equals(this.user, this.master)) {
      this.UsersFactory.upsertUser(user).then(() => {
        // toastr.success('User updated successfully', 'Done');
      });
    }
  }
}
