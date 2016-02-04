export default class EditorsController {
  /*@ngInject*/
  constructor($scope, AuthFactory, UsersFactory) {
    this.AuthFactory = AuthFactory;
    this.UsersFactory = UsersFactory;
    this.users = UsersFactory.users;
    $scope.exclude = (elem) => {
      return !elem.role.match(/^(admin|editor)$/);
    };
  }
}
