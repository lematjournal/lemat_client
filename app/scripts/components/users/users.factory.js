import { Injectable, Inject } from 'ng-forward';
import ServerUrl from '../../constants.module';

import 'babel-polyfill';
import 'reflect-metadata';

// this.users.filter((user) => {
//   if (user.role.match(/^(admin|editor)$/)) {
//     return user;
//   }
// });

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

  checkLocalStorage() {
    try {
      let contributors = JSON.parse(this.$window.localStorage.getItem('ngStorage-issueUsers'));
      if (contributors) angular.copy(contributors, this.contributors);
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  deleteUser(id) {
    return this.$http.delete(ServerUrl + '/users/' + id).then(() => {
      this.users.splice(this.findUserById(id), 1);
    });
  }

  evalContributorsAge() {
    let grabDate = JSON.parse(this.$window.localStorage.getItem('ngStorage-issueUsersGrabDate')).valueOf();
    return grabdate - Date.now().valueOf() > (1000 * 60 * 60 * 72);
  }

  async fetchContributors() {
    if (!this.checkLocalStorage()) {
      await this.getContributors();
    } else if (this.evalContributorsAge) {
      await this.getContributors();
    } else {
      // the users are d'accord
    }
  }

  async fetchUsers() {
    try {
      if (!this.users) {
        let response = await this.getUsers();
      }
    } catch (error) {
      console.error(error);
    }
  }

  findUserById(id) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === id) {
        return i;
      }
    }
  }

  async getContributors() {
    try {
      let response = await this.$http.get(ServerUrl + '/users/issue-users');
      this.$window.localStorage.setItem('ngStorage-issueUsers', JSON.stringify(response.data));
      this.$window.localStorage.setItem('ngStorage-issueUsersGrabDate', JSON.stringify(Date.now()));
      angular.copy(response.data, this.contributors);
    } catch (error) {
      console.error(error);
    }
  }

  getProfile(user) {
    return this.$http.get(ServerUrl + '/users/profiles/' + user.id).then((response) => {
      angular.copy(response.data, this.profile);
    });
  }

  getUser(username) {
    return this.$http.get(ServerUrl + '/users/' + username).then((response) => {
      angular.copy(response.data, this.user);
    });
  }

  async getUsers() {
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

  resetUser() {
    angular.copy({}, this.user);
  }

  upsertUser(user) {
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
    this.getUsers();
  }
}
