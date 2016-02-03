import UsersFactory from '../../services/factories.module';
import AuthFactory from '../../services/factories.module';

export default class EditorsController {
  /*@ngInject*/
  constructor($scope, $location, AuthFactory, UsersFactory) {
    this.AuthFactory = AuthFactory;
    this.UsersFactory = UsersFactory;
    this.users = UsersFactory.users;
    $scope.exclude = (elem) => {
      return !elem.role.match(/^(admin|editor)$/);
    };
  }
}
