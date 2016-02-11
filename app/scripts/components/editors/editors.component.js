import { Component, Inject, Resolve } from 'ng-forward';
import UsersFactory from '../users/users.factory';

@Component({
  selector: 'editors',
  templateUrl: './scripts/components/editors/editors.html',
  providers: [UsersFactory],
  controllerAs: 'editorsCtrl'
})

@Inject(UsersFactory)
export default class EditorsComponent {
  @Resolve()
  @Inject(UsersFactory)
  static resolve(UsersFactory) {
    return UsersFactory.getUsers();
  }

  constructor(UsersFactory) {
    this.users = UsersFactory.users.filter((user) => {
      if (user.role.match(/^(admin|editor)$/)) {
        return user;
      }
    });
  }
}
