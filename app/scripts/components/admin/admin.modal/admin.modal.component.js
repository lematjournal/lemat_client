import { Component, Inject } from 'ng-forward';
import AuthFactory from '../../../services/authentication.factory';
import EntriesFactory from '../../entries/entries.factory';
import IssuesFactory from '../../issues/issues.factory';
import PostsFactory from '../../posts/posts.factory';
import TagsFactory from '../../../services/tags.factory';
import UsersFactory from '../../users/users.factory';
import 'babel-polyfill';
import 'ng-tags-input';
import 'reflect-metadata';

@Component({
  selector: 'admin-modal',
  controllerAs: 'adminModalCtrl',
  providers: ['ngTagsInput', AuthFactory, TagsFactory, UsersFactory],
  templateUrl: './scripts/components/admin/admin.modal/admin.modal.html'
})

@Inject('$rootScope', '$uibModalInstance', AuthFactory, TagsFactory, UsersFactory)
export default class AdminModalComponent {
  constructor($rootScope, $uibModalInstance, AuthFactory, TagsFactory, UsersFactory, factory, object, selector, edit) {
    this.$rootScope = $rootScope;
    this.$uibModalInstance = $uibModalInstance;
    this.edit = edit;
    this.object = object;
    this.selector = selector;
    this.TagsFactory = TagsFactory;
    this.tags = TagsFactory.tags;
    this.AuthFactory = AuthFactory;
    this.user = AuthFactory.getUser();
    this.UsersFactory = UsersFactory;
    this.ObjectsFactory = factory;
  }

  close() {
    this.$uibModalInstance.dismiss('cancel');
  }

  async ok() {
    await this.upsert(this.object);
    this.$uibModalInstance.close();
  }

  async upsert(object) {
    await this.ObjectsFactory.upsert(object);
    this.$rootScope.$broadcast('adminModalClose');
  }
}
