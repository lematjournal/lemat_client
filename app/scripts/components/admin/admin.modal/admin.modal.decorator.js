import AdminModalComponent from './admin.modal.component';

export default function AdminModal(target, name, descriptor) {
  let openAdminModal = function(callback, edit) { // edit value determines whether the modal header displays "create" or "edit"
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
        },
        edit: () => {
          return edit;
        }
      }
    });
  }
  target.prototype.openAdminModal = openAdminModal;
}
