import { Component, Inject } from 'ng-forward';
import AS3Factory from '../../../services/as3.factory';
import AuthFactory from '../../../services/authentication.factory';
import DocumentsService from '../../../services/documents.service';
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
  providers: ['ngTagsInput', AS3Factory, AuthFactory, DocumentsService, TagsFactory, UsersFactory],
  templateUrl: './scripts/components/admin/admin.modal/admin.modal.html'
})

@Inject('$rootScope', '$scope', '$uibModalInstance', AS3Factory, AuthFactory, DocumentsService, TagsFactory, UsersFactory)
export default class AdminModalComponent {
  constructor($rootScope, $scope, $uibModalInstance, AS3Factory, AuthFactory, DocumentsService, TagsFactory, UsersFactory, factory, object, selector, edit) {
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.$uibModalInstance = $uibModalInstance;
    this.edit = edit;
    this.object = object;
    this.selector = selector;
    this.TagsFactory = TagsFactory;
    this.tags = TagsFactory.tags;
    this.AS3Factory = AS3Factory;
    this.AuthFactory = AuthFactory;
    this.DocumentsService = DocumentsService;
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

  async attachDocument(file) {
    try {
      let response = await this.AS3Factory.upload(file, '/uploads/');
      this.object.content = await this.DocumentsService.convert(response.data.url);
      this.$scope.$digest();
    } catch (error) {
      console.error(error);
    }
  }

  async upsert(object) {
    await this.ObjectsFactory.upsert(object);
    this.$rootScope.$broadcast('adminModalClose');
  }
}
