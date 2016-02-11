import { Component, Inject, Resolve } from 'ng-forward';
import { ImageModal } from '../images/images.decorator';
import AuthFactory from '../../services/authentication.factory';
import NgEnter from '../../directives/ng-enter.directive';
import NgEsc from '../../directives/ng-esc.directive';
import UsersFactory from '../users/users.factory';

import 'angular-ui-bootstrap';
import 'babel-polyfill';

@Component({
  selector: 'profile-edit',
  controllerAs: 'profileEditCtrl',
  providers: ['ui.bootstrap.modal', 'ui.bootstrap.tooltip', AuthFactory, UsersFactory],
  directives: [NgEnter, NgEsc],
  templateUrl: './scripts/components/profile/profile.edit.html'
})

@ImageModal
@Inject('$scope', '$uibModal', AuthFactory, UsersFactory)
export default class ProfileEditComponent {
  @Resolve()
  @Inject('$window', UsersFactory)
  static resolve($window, UsersFactory) {
    let user = JSON.parse($window.localStorage.getItem('lemat-user')).data;
    return UsersFactory.getUser(user.username);
  }

  constructor($scope, $uibModal, AuthFactory, UsersFactory) {
    this.master = {};
    this.fields = {};
    this.$uibModal = $uibModal;
    this.AuthFactory = AuthFactory;
    this.UsersFactory = UsersFactory;
    this.user = UsersFactory.user;
    $scope.popover = {
      templateUrl: 'popoverTemplate.html',
    };
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
