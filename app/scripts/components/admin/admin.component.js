import { Component, Inject, Resolve } from 'ng-forward';
import AdminModal from './admin.modal/admin.modal.decorator';
import EntriesFactory from '../entries/entries.factory';
import IssuesFactory from '../issues/issues.factory';
import LematButton from '../layout/buttons/lemat-button';
import PostsFactory from '../posts/posts.factory';
import TagsFactory from '../../services/tags.factory';
import UsersFactory from '../users/users.factory';
import 'angular-ui-grid/ui-grid';
import 'reflect-metadata';
import 'ng-tags-input';

let inflect = require('i')();

@Component({
  selector: 'admin',
  providers: ['ngTagsInput', 'ui.bootstrap.modal', 'ui.grid', 'ui.grid.edit', 'ui.grid.selection', EntriesFactory, IssuesFactory, PostsFactory, TagsFactory, UsersFactory],
  directives: [LematButton],
  templateUrl: './scripts/components/admin/admin.html',
  controllerAs: 'adminCtrl'
})

@AdminModal
@Inject('$uibModal', 'uiGridConstants', EntriesFactory, IssuesFactory, PostsFactory, TagsFactory, UsersFactory)
export default class AdminComponent {
  @Resolve()
  @Inject(EntriesFactory, IssuesFactory, PostsFactory, TagsFactory, UsersFactory)
  static resolve(EntriesFactory, IssuesFactory, PostsFactory, TagsFactory, UsersFactory) {
    return Array.prototype.slice.call(arguments).map((factory) => factory.query());
  }

  constructor($uibModal, uiGridConstants, EntriesFactory, IssuesFactory, PostsFactory, UsersFactory) {
    this.$uibModal = $uibModal;
    this.gridApi = {};
    this.selector = null;
    this.object = {};
    this.ObjectsFactory = {};
    this.uiGridConstants = uiGridConstants;
    this.EntriesFactory = EntriesFactory;
    this.IssuesFactory = IssuesFactory;
    this.PostsFactory = PostsFactory;
    this.UsersFactory = UsersFactory;
    this.entries = EntriesFactory.entries;
    this.issues = IssuesFactory.issues;
    this.posts = PostsFactory.posts;
    this.users = UsersFactory.users;

    this.contentColDefs = [
      { name: 'id', field: 'id', width: '3%' },
      { name: 'title', field: 'title'},
      { name: 'user', field: 'user.username' },
      { field: 'created_at'},
      { field: 'updated_at'}
    ];

    this.userColDefs = [
      { name: 'id', field: 'id', width: '3%' },
      { name: 'name', field: 'username'},
      { name: 'email', field: 'email' },
      { name: 'role', field: 'role' },
      { field: 'created_at'},
      { field: 'updated_at'}
    ];

    this.gridOptions = {
      enableRowHeaderSelection: false,
      enableRowSelection: true,
      enableGridMenu: true,
      multiSelect: true,
      columnDefs: this.contentColDefs
    };

    this.gridOptions.multiSelect = false;
    this.gridOptions.modifierKeysToMultiSelect = false;
    this.gridOptions.noUnselect = false;

    this.gridOptions.onRegisterApi = (gridApi) => {
        this.gridApi = gridApi;
        gridApi.selection.on.rowSelectionChanged(null, (row) => {
          angular.copy(row.entity, this.object);
        });
    }
  }

  async setData(object) {
    this.selector = inflect.singularize(object);
    if (object === 'entries') {
      this.gridOptions.data = this.entries;
      this.gridOptions.columnDefs = this.contentColDefs;
      angular.copy(this.EntriesFactory, this.ObjectsFactory);
    } else if (object === 'posts') {
      this.gridOptions.data = this.posts;
      this.gridOptions.columnDefs = this.contentColDefs;
      angular.copy(this.PostsFactory, this.ObjectsFactory);
    } else if (object === 'issues') {
      this.gridOptions.data = this.issues;
      this.gridOptions.columnDefs = this.contentColDefs;
      angular.copy(this.IssuesFactory, this.ObjectsFactory);
    } else if (object === 'users') {
      this.gridOptions.data = this.users;
      this.gridOptions.columnDefs = this.userColDefs;
    }
  }

  resetSelection(callback) {
    angular.copy({}, this.object);
    callback ? callback() : null;
  }
}
