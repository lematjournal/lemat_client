import { Service } from 'a1atscript';
import ServerUrl from '../constants.module';

@Service('AuthFactory', ['$http', '$window'])
export default class AuthFactory {
  constructor($http, $window) {
    this.$http = $http;
    this.$window = $window;
    this.userId = {};
    this.session = {};
  }

  login(credentials) {
    return this.$http.post(ServerUrl + '/users/login', credentials).then((response) => {
      this.userId = response.id;
      this._storeSession(response);
    });
  }

  logout() {
    return this.$http.post(ServerUrl + '/users/logout').then(() => {
      this.$window.localStorage.removeItem('lemat-user');
      this.userId = {};
    });
  }

  register(credentials) {
    let params = {
      user: {
        email: credentials.email,
        password: credentials.password
      }
    };
    return this.$http.post(ServerUrl + '/users/', params).then((response) => {
      this._storeSession(response);
    });
  }

  isAuthenticated() {
    let data = JSON.parse(this.$window.localStorage.getItem('lemat-user'));
    if (data) {
      return true;
    } else {
      return false;
    }
  }

  isAdmin() {
    if (this.$window.localStorage.getItem('lemat-user')) {
      let user = JSON.parse(this.$window.localStorage.getItem('lemat-user'));
      if (user.data.role === 'admin') {
        return true;
      } else {
        return false;
      }
    }
  }

  getUserRole() {
    if (this.isAuthenticated()) {
      let user = JSON.parse(this.$window.localStorage.getItem('lemat-user'));
      return user.data.role;
    } else {
      return 'user';
    }
  }

  setUser() {
    let deferred = this.$q.defer();
    if (this.$window.localStorage.getItem('lemat-user')) {
      let user = JSON.parse(this.$window.localStorage.getItem('lemat-user'));
      user = {
        id: user.data.id,
        email: user.data.email,
        username: user.data.username,
        role: user.data.role,
        weight: user.data.weight
      };
      deferred.resolve(angular.copy(user, this.session));
    }

    return deferred.promise;

  }

  _storeSession(response) {
    this.$window.localStorage.setItem('lemat-user', JSON.stringify(response));
    if (response.data.role = "admin") {
      this.$http.defaults.headers.common.Authorization = 'Token token=' + response.data.token;
      console.log(response.data.token);
    }
  }
}
