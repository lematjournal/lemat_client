export default class UsersModalController {
  constructor($scope, $rootScope, $uibModalInstance, UsersFactory) {
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.$uibModalInstance = $uibModalInstance;
    this.UsersFactory = UsersFactory;
    this.user = {};
  }

  async ok() {
    try {
      await this.UsersFactory.upsertUser(this.user)
      this.user = UsersFactory.user;
      console.log('User created successfully', 'Done');
      console.log(this.user);
      this.$uibModalInstance.close(this.user);
    } catch (error) {
      console.error(error);
    }
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }
}
