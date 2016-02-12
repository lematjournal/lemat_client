import { Component, Inject } from 'ng-forward';
import EntriesComponent from './entries.component';
// import { ImageModal } from '../images/images.decorator';
// import { UserModal } from '../users/users.decorator';
import AS3Factory from '../../services/as3.factory';
import AuthFactory from '../../services/authentication.factory';
import EntriesFactory from './entries.factory';
import ImagesFactory from '../images/images.factory';
import 'babel-polyfill';

@Component({
  selector: 'entries-admin',
  providers: [AS3Factory, AuthFactory, EntriesFactory, ImagesFactory],
  templateUrl: './scripts/components/entries/entries.admin.html'
})

// @ImageModal
// @UserModal
@Inject('$scope', '$stateParams', '$uibModal', AS3Factory, AuthFactory, EntriesFactory, ImagesFactory)
export default class EntriesAdminComponent extends EntriesComponent {
  constructor($scope, $uibModal, AS3Factory, AuthFactory, EntriesFactory, ImagesFactory, IssuesFactory, PostsFactory, UsersFactory) {
    super($scope, EntriesFactory);
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
