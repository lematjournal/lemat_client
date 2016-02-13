import { Component, Inject } from 'ng-forward';
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
  providers: ['ngTagsInput', TagsFactory, UsersFactory],
  templateUrl: './scripts/components/admin/admin.modal/admin.modal.html'
})

@Inject('$uibModalInstance', TagsFactory, UsersFactory)
export default class AdminModalComponent {
  constructor($uibModalInstance, TagsFactory, UsersFactory, factory, object, selector) {
    this.$uibModalInstance = $uibModalInstance;
    this.object = object;
    this.selector = selector;
    this.TagsFactory = TagsFactory;
    this.tags = TagsFactory.tags;
    this.UsersFactory = UsersFactory;
    this.ObjectFactory = factory;
  }

  close() {
    this.$uibModalInstance.dismiss('cancel');
  }

  getTags() {
    return this.TagsFactory.query();
  }

  ok() {
    this.$uibModalInstance.close();
    this.factory.upsert(this.object);
  }
}
