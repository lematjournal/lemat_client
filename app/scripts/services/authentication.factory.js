import { Injectable, Inject } from 'ng-forward';
import ServerUrl from '../constants.module';
import 'babel-polyfill';
import 'reflect-metadata';

@Injectable()
@Inject('$http', '$window')
export default class AuthFactory {
  constructor($http, $window) {
    this.$http = $http;
    this.$window = $window;
    this.session = {};
  }

  async login(credentials) {
    try {
      let response = await this.$http.post(ServerUrl + '/users/login', credentials);
      this._storeSession(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async logout() {
    try {
      await this.$http.post(ServerUrl + '/users/logout');
      this.$window.localStorage.removeItem('lemat-user');
    } catch (error) {
      console.error(error);
    }
  }

  async register(credentials) {
    let params = {
      user: {
        email: credentials.email,
        password: credentials.password
      }
    };
    try {
      let response = await this.$http.post(ServerUrl + '/users/', params);
      this._storeSession(response);
    } catch (error) {
      console.error(error);
    }
  }

  isAuthenticated() {
    if (this.$window.localStorage.getItem('lemat-user')) {
      return true;
    } else {
      return false;
    }
  }

  isAdmin() {
    if (this.isAuthenticated()) {
      let user = this.getUser();
      if (user.role === 'admin') {
        return true;
      } else {
        return false;
      }
    }
  }

  getUserRole() {
    if (this.isAuthenticated()) {
      let user = this.getUser();
      return user.role;
    } else {
      return 'user';
    }
  }

  getUser() {
    if (this.isAuthenticated()) {
      let user = JSON.parse(this.$window.localStorage.getItem('lemat-user'));
      return user;
    } else {
      console.error('user is not authenticated');
    }
  }

  setUser() {
    if (this.isAuthenticated) {
      let user = this.getUser();
      user = {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        weight: user.weight
      };
      angular.copy(user, this.session);
    }
  }

  _storeSession(response) {
    this.$window.localStorage.setItem('lemat-user', JSON.stringify(response));
    if (response.role = "admin") {
      this.$http.defaults.headers.common.Authorization = 'Token token=' + response.token;
      console.log(response.token);
    }
  }
}
