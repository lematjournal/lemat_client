import { Controller } from 'a1atscript';

@Controller('LoginController', ['$rootScope', '$location', 'AuthFactory'])
export default class LoginController {
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
    console.log('Logged in', 'Done');
  }
}
