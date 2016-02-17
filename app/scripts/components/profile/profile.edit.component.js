import { Component, Inject, Resolve } from 'ng-forward';
import AuthFactory from '../../services/authentication.factory';
import ImagesFactory from '../images/images.factory';
import NgEnter from '../../directives/ng-enter.directive';
import NgEsc from '../../directives/ng-esc.directive';
import UsersFactory from '../users/users.factory';
import 'babel-polyfill';

@Component({
  selector: 'profile-edit',
  controllerAs: 'profileEditCtrl',
  providers: [AuthFactory, UsersFactory],
  directives: [NgEnter, NgEsc],
  templateUrl: './scripts/components/profile/profile.edit.html'
})

@Inject('$scope', '$uibModal', AuthFactory, UsersFactory)
export default class ProfileEditComponent {
  @Resolve()
  @Inject(AuthFactory, UsersFactory)
  static resolve(AuthFactory, UsersFactory) {
    let user = AuthFactory.getUser();
    return UsersFactory.get(user.username);
  }

  constructor($scope, $uibModal, AuthFactory, UsersFactory) {
    this.$scope = $scope;
    this.$uibModal = $uibModal;
    this.AuthFactory = AuthFactory;
    this.UsersFactory = UsersFactory;
    this.user = UsersFactory.user;
    this.master = {};
    this.fields = {};
    this.$scope.popover = {
      templateUrl: 'popoverTemplate.html',
    };
  }

  reset(event) {
    if (event.keyCode === 27) {
      this.userForm.$rollbackViewValue();
    }
  }

  resetProfile() {
    this.user = this.master;
    console.info('User reset to last save', 'Done');
  }

  save(event, field, user) {
    this.fields[field] = !this.fields[field];
    this.upsertProfile(user);
  }

  async upsert(user) {
    try {
      if (this.AuthFactory.isAuthenticated() && !angular.equals(this.user, this.master)) {
        let response = await this.UsersFactory.upsertUser(user);
        console.log('User updated successfully', 'Done');
      }
    } catch (error) {
      console.error(error);
    }
  }
}
