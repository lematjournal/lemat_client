import { Service } from 'a1atscript';
import ServerUrl from '../../constants.module';

@Service('UsersFactory', ['$http', '$localStorage', 'AuthFactory'])
export default class UsersFactory {
  constructor($http, $localStorage, AuthFactory) {
    this.editors = [];
    this.users = $localStorage.users;
    this.user = {};
    this.postUsers = $localStorage.postUsers;
    this.profile = {};
    this.issueUsers = $localStorage.issueUsers;
    this.$http = $http;
    this.$localStorage = $localStorage;
  }

  checkStoredUsers() {
    this.getContributors() && this.getOnlineUsers();
  }

  deleteUser(id) {
    return this.$http.delete(ServerUrl + '/users/' + id).then(() => {
      this.users.splice(this.findUserById(id), 1);
    });
  }

  findUserById(id) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === id) {
        return i;
      }
    }
  }
  getContributors() {
    if (!this.issueUsers) {
      this.getIssueUsers().then((response) => {
        this.issueUsers = response;
      });
    } else if ((this.$localStorage.issueUsersGrabDate.valueOf() - Date.now().valueOf()) > (1000 * 60 * 60 * 72)) {
      this.getIssueUsers().then((response) => {
        this.issueUsers = response;
      });
    } else {
      this.issueUsers = this.issueUsers;
    }
  }

  getOnlineUsers() {
    if (!this.postUsers) {
      this.getPostUsers().then((response) => {
        this.postUsers = response;
      });
    } else if ((this.$localStorage.postUsersGrabDate.valueOf() - Date.now().valueOf()) > (1000 * 60 * 60 * 72)) {
      this.getPostUsers().then((response) => {
        this.postUsers = response;
      });
    } else {
      this.postUsers = this.postUsers;
    }
  }

  getPostUsers() {
    this.$http.get(ServerUrl + '/users/post-users').then((response) => {
      this.$localStorage.postUsers = response.data;
      this.$localStorage.postUsersGrabDate = Date.now();
      return this.$localStorage.postUsers;
    });
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

  getUsers() {
    return this.$http.get(ServerUrl + '/users/').then((response) => {
      this.$localStorage.users = response.data;
      this.$localStorage.usersGrabDate = Date.now();
    });
  }

  getIssueUsers() {
    this.$http.get(ServerUrl + '/users/issue-users').then((response) => {
      this.$localStorage.issueUsers = response.data;
      this.$localStorage.issueUsersGrabDate = Date.now();
      return this.$localStorage.issueUsers;
    });
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
