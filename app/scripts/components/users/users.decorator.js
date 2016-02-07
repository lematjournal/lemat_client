import UsersFactory from './users.factory';

export function UserModal(target) {
  let openUserModal = function() {
    this.$uibModalInstance = this.$uibModal.open({
      templateUrl: 'scripts/components/users/users.modal/users.modal.html',
      controller: 'UsersController',
      size: 'lg',
      resolve: {
        users: (UsersFactory) => { /*@ngInject*/
          UsersFactory.getUsers();
          return UsersFactory.users;
        }
      }
    });
    this.$uibModalInstance.result.then(::this.userModalCallback);
  }
  target.prototype.openUserModal = openUserModal;
}
