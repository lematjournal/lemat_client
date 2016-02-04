// import EntriesController from './entries.controller';
import { ImageModal } from '../images/images.decorator';
import 'babel-polyfill';

@ImageModal
export default class EntriesAdminController {
  /*@ngInject*/
  constructor($scope, $stateParams, $uibModal, AuthFactory, AS3Factory, EntriesFactory, ImagesFactory, IssuesFactory, PostsFactory, UsersFactory) {
    this.$scope = $scope;
    this.$uibModal = $uibModal;
    this.EntriesFactory = EntriesFactory;
    this.IssuesFactory = IssuesFactory;
    this.PostsFactory = PostsFactory;
    this.AuthFactory = AuthFactory;
    this.AS3Factory = AS3Factory;
    this.ImagesFactory = ImagesFactory;
    this.UsersFactory = UsersFactory;
    this.users = UsersFactory.users;
    this.issues = IssuesFactory.issues;
    this.entries = EntriesFactory.entries;
    this.entry = EntriesFactory.entry;
    $scope.$on('selectedUser', this.selectedUser);
  }

  selectedUser(event, data) {
    this.entry.user_id = data.id;
  }

  upsertEntry(entry) {
    if (this.AuthFactory.isAuthenticated()) {
      this.EntryFactory.upsertEntry(entry);
      this.$stateParams.path('admin.entries');
    }
  }

  deleteEntry(id) {
    if (this.AuthFactory.isAuthenticated()) {
      this.EntryFactory.deleteEntry(id);
      this.$stateParams('admin.entries')
    }
  }

  openUserModal() {
    this.$uibModalInstance = this.$uibModal.open({
      templateUrl: 'scripts/components/users/users.create.modal/users.create.modal.html',
      controller: 'UsersCreateModalController',
      controllerAs: 'usersCreateModalCtrl',
      size: 'lg'
    });

    this.$uibModalInstance.result.then((user) => {
      this.entry.user_id = user.id;
    });
  }
}
