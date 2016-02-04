export default class PermissionFactory {
  /*@ngInject*/
  constructor($rootScope, $location, AuthFactory) {
    this.$rootScope = $rootScope;
    this.$location = $location;
    this.AuthFactory = AuthFactory;
    this.clearance = {};
    this.permission = {};
    this.roles = {
      admin: 3,
      editor: 2,
      author: 1,
      contributor: 1,
      user: 0
    };
  }

  permissionCheck() {
    let role = this.AuthFactory.getUserRole();
    if (role === 'admin') {
      clearance = 3;
    } else if (role === 'editor') {
      clearance = 2;
    } else if (role === 'author') {
      clearance = 1;
    } else if (role === 'contributor') {
      clearance = 1;
    } else if (role === 'user') {
      clearance = 0;
    }
    return clearance;
  }

  PermissionLevel(role) {
    // there is probably a more programmatic way of doing this
    if (role === 'admin') {
      this.role = roles.admin;
    } else if (role === 'editor') {
      this.role = roles.editor;
    } else if (role === 'author') {
      this.role = roles.author;
    } else if (role === 'contributor') {
      this.role = roles.contributor;
    } else {
      this.role = roles.user;
    }
  }

  getLevel() {
    return this.role;
  }

  getPermission() {
    let ifPermissionPassed = false;
    if (permissionCheck() >= permission.getLevel()) {
      ifPermissionPassed = true;
    } else {
      ifPermissionPassed = false;
    }
    if (!ifPermissionPassed) {
      $location.path('/');
    }
  }

  setPermission(role) {
    // permission = new PermissionLevel(role);
    this.getPermission();
  }
}
