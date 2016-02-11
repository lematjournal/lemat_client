import { Controller } from 'a1atscript';
import EntriesComponent from './entries.component';
import { ImageModal } from '../images/images.decorator';
import { UserModal } from '../users/users.decorator';
import 'babel-polyfill';

@ImageModal
@UserModal
@Controller('EntriesAdminController', ['$scope', '$stateParams', '$uibModal', 'AS3Factory', 'AuthFactory', 'EntriesFactory', 'ImagesFactory', 'IssuesFactory', 'PostsFactory', 'UsersFactory'])
export default class EntriesAdminController extends EntriesComponent {
  constructor($scope, $stateParams, $uibModal, AS3Factory, AuthFactory, EntriesFactory, ImagesFactory, IssuesFactory, PostsFactory, UsersFactory) {
    super($scope, $stateParams, EntriesFactory, IssuesFactory, PostsFactory);
    this.$uibModal = $uibModal;
    this.AuthFactory = AuthFactory;
    this.AS3Factory = AS3Factory;
    this.ImagesFactory = ImagesFactory;
    this.UsersFactory = UsersFactory;
    this.users = UsersFactory.users;
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
}
