import { Component, Inject } from 'ng-forward';
import AuthFactory from '../../services/authentication.factory';
import LematButton from '../layout/buttons/lemat-button';
import 'babel-polyfill';

@Component({
  selector: 'login',
  providers: [AuthFactory],
  directives: [LematButton],
  templateUrl: './scripts/components/login/login.html',
  controllerAs: 'loginCtrl'
})

@Inject('$rootScope', AuthFactory)
export default class LoginComponent {
  constructor($rootScope, $location, AuthFactory) {
    this.$rootScope = $rootScope;
    this.AuthFactory = AuthFactory;
    this.credentials = {};
  }

  async postCredentials(credentials) {
    try {
      await this.AuthFactory.login(credentials);
      this.$rootScope.session = this.AuthFactory.setUser();
      this.$rootScope.userId = this.AuthFactory.session.id;
      console.log('Logged in', 'Done');
    } catch (error) {
      console.error(error);
    }
  }
}
