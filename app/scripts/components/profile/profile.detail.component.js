import { Component, Inject, Resolve } from 'ng-forward';
import UsersFactory from '../users/users.factory';
import 'babel-polyfill';

@Component({
  selector: 'profile',
  controllerAs: 'profileCtrl',
  providers: [UsersFactory],
  templateUrl: './scripts/components/profile/profile.detail.html'
})

@Inject(UsersFactory)
export default class ProfileDetailComponent {
  @Resolve()
  @Inject('$stateParams', UsersFactory)
  static resolve($stateParams, UsersFactory) {
    return UsersFactory.get($stateParams.profile);
  }

  constructor(UsersFactory) {
    this.user = UsersFactory.user;
  }
}
