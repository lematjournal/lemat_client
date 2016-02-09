import { Controller } from 'a1atscript';

@Controller('EditorsController', ['$scope', 'AuthFactory', 'UsersFactory'])
export default class EditorsController {
  constructor($scope, AuthFactory, UsersFactory) {
    this.AuthFactory = AuthFactory;
    this.UsersFactory = UsersFactory;
    this.users = UsersFactory.users.filter((user) => {
      if (user.role.match(/^(admin|editor)$/)) {
        return user;
      }
    });
  }
}
