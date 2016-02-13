import { Injectable, Inject } from 'ng-forward';
import ServerUrl from '../../constants.module';
import 'babel-polyfill';
import 'reflect-metadata';

@Injectable()
@Inject('$http', '$window')
export default class UsersFactory {
  constructor($http, $window) {
    this.$window = $window;
    this.users = [];
    this.editors = [];
    this.user = {};
    this.profile = {};
    this.contributors = [];
    this.$http = $http;
  }

  _checkLocalStorage() {
    try {
      let contributors = JSON.parse(this.$window.localStorage.getItem('ngStorage-issueUsers'));
      if (contributors) angular.copy(contributors, this.contributors);
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async delete(id) {
    try {
      await this.$http.delete(ServerUrl + '/users/' + id)
      this.users.splice(this.findById(id), 1);
    } catch (error) {
      console.error(error);
    }
  }

  _evalContributorsAge() {
    let grabDate = JSON.parse(this.$window.localStorage.getItem('ngStorage-issueUsersGrabDate')).valueOf();
    return grabdate - Date.now().valueOf() > (1000 * 60 * 60 * 72);
  }

  async fetchContributors() {
    if (!this._checkLocalStorage()) {
      await this._getContributors();
    } else if (this._evalContributorsAge) {
      await this._getContributors();
    } else {
      // the users are d'accord
    }
  }

  findById(id) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === id) {
        return i;
      }
    }
  }

  async _getContributors() {
    try {
      let response = await this.$http.get(ServerUrl + '/users/issue-users');
      this.$window.localStorage.setItem('ngStorage-issues', JSON.stringify(response.data));
      this.$window.localStorage.setItem('ngStorage-issuesGrabDate', JSON.stringify(Date.now()));
      angular.copy(response.data, this.contributors);
    } catch (error) {
      console.error(error);
    }
  }

  async get(username) {
    try {
      let response = await this.$http.get(ServerUrl + '/users/' + username);
      angular.copy(response.data, this.user);
    } catch (error) {
      console.error(error);
    }
  }

  async _fetchUserIndex() {
    try {
      let response = await this.$http.get(ServerUrl + '/users/');
      this.$window.localStorage.setItem('ngStorage-users', JSON.stringify(response.data));
      this.$window.localStorage.setItem('ngStorage-usersGrabDate', JSON.stringify(Date.now()));
      angular.copy(JSON.parse(this.$window.localStorage.getItem('ngStorage-users')), this.users);
      this.editors = this.users.filter((user) => {
        if (user.role.match(/^(admin|editor)$/)) {
          return user;
        }
      });
      return this.users;
    } catch (error) {
      console.error(error);
    }
  }

  async query() {
    try {
      if (this.users.length === 0) {
        angular.copy(JSON.parse(this.$window.localStorage.getItem('ngStorage-users')), this.users);
        return this.users;
      }
    } catch (error) {
      console.error(error, 'fetching users...');
      this.users = await this._fetchUserIndex();
    }
  }

  reset() {
    angular.copy({}, this.user);
  }

  upsert(user) {
    let params = {
      user: {
        email: user.email,
        username: user.username.replace(/[^\w\s]/gi, ''),
        role: user.role,
        bio: user.bio,
        password: user.password,
        profile_image: user.profile_image,
        social_links: user.social_links
      }
    };

    if (user.id) {
      return this.$http.patch(ServerUrl + '/users/' + user.id, params).then((response) => {
        angular.copy(response.data, this.user);
        this.users.push(response.data);
      });
    } else {
      return this.$http.post(ServerUrl + '/users/', params).then((response) => {
        angular.copy(response.data, this.user);
        this.users.push(response.data);
      });
    }
  }
}
