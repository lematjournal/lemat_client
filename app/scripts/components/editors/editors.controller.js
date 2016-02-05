export default class EditorsController {
  /*@ngInject*/
  constructor($scope, $filter, AuthFactory, UsersFactory) {
    this.AuthFactory = AuthFactory;
    this.UsersFactory = UsersFactory;
    this.users = UsersFactory.users.filter((user) => {
      if (user.role.match(/^(admin|editor)$/)) {
        return user;
      }
    });
  }
}
