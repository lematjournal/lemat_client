export default class FooterController {
  /*@ngInject*/
  constructor($rootScope, $state, $localStorage, UsersFactory) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$localStorage = $localStorage;
    this.UsersFactory = UsersFactory;
    this.issueUsers = UsersFactory.issueUsers;
    this.postUsers = UsersFactory.postUsers;
  }
}
