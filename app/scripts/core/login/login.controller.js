import toastr from 'toastr';

export default class LoginController {
  /*@ngInject*/
  constructor($rootScope, $location, AuthFactory) {
    this.$rootScope = $rootScope;
    this.$location = $location;
    this.AuthFactory = AuthFactory;
    $rootScope.session = AuthFactory.setUser();
    $rootScope.userId = AuthFactory.session.id;
  }

  postCredentials(credentials) {
    this.AuthFactory.login(credentials);
    this.$rootScope.session = this.AuthFactory.setUser();
    this.$rootScope.userId = this.AuthFactory.session.id;
    this.$location.path('/');
    this.toastr.success('Logged in', 'Done');
  }
}
