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

@Inject('$rootScope', '$state', AuthFactory)
export default class LoginComponent {
  constructor($rootScope, $state, AuthFactory) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.AuthFactory = AuthFactory;
    this.credentials = {};
  }

  async postCredentials(credentials) {
    try {
      await this.AuthFactory.login(credentials);
      this.$rootScope.session = this.AuthFactory.session;
      this.$rootScope.userId = this.AuthFactory.session.id;
      this.$state.go('main');
      console.log('Logged in', 'Done');
    } catch (error) {
      console.error(error);
    }
  }
}
