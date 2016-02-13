import AdminModalComponent from './admin.modal.component';

export default function AdminModal(target, name, descriptor) {
  let openAdminModal = function(callback) {
    this.$uibModalInstance = this.$uibModal.open({
      templateUrl: 'scripts/components/admin/admin.modal/admin.modal.html',
      controller: AdminModalComponent,
      controllerAs: 'adminModalCtrl',
      size: 'lg',
      resolve: {
        factory: () => {
          return this.ObjectsFactory;
        },
        object: () => {
          return this.object;
        },
        selector: () => {
          return this.selector;
        }
      }
    });
    callback ? this.$uibModalInstance.result.then(callback) : null;
  }
  target.prototype.openAdminModal = openAdminModal;
}
