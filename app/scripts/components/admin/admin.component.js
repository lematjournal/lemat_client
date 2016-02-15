import { Component, Inject, Resolve } from 'ng-forward';
import AdminModal from './admin.modal/admin.modal.decorator';
import EntriesFactory from '../entries/entries.factory';
import IssuesFactory from '../issues/issues.factory';
import LematButton from '../layout/buttons/lemat-button';
import PiecesFactory from '../issues/pieces/pieces.factory';
import PostsFactory from '../posts/posts.factory';
import TagsFactory from '../../services/tags.factory';
import UsersFactory from '../users/users.factory';
import 'angular-ui-grid/ui-grid';
import 'reflect-metadata';
import 'ng-tags-input';

let inflect = require('i')();

@Component({
  selector: 'admin',
  providers: ['ngTagsInput', 'ui.bootstrap.modal', 'ui.grid', 'ui.grid.edit', 'ui.grid.selection', 'ui.grid.treeView', EntriesFactory, IssuesFactory, PiecesFactory, PostsFactory, TagsFactory, UsersFactory],
  directives: [LematButton],
  templateUrl: './scripts/components/admin/admin.html',
  controllerAs: 'adminCtrl'
})

@AdminModal
@Inject('$scope', '$timeout', '$uibModal', 'uiGridConstants', 'uiGridTreeViewConstants', EntriesFactory, IssuesFactory, PiecesFactory, PostsFactory, TagsFactory, UsersFactory)
export default class AdminComponent {
  @Resolve()
  @Inject(EntriesFactory, IssuesFactory, PostsFactory, TagsFactory, UsersFactory)
  static resolve(EntriesFactory, IssuesFactory, PostsFactory, TagsFactory, UsersFactory) {
    return Array.prototype.slice.call(arguments).map((factory) => factory.query());
  }

  constructor($scope, $timeout, $uibModal, uiGridConstants, uiGridTreeViewConstants, EntriesFactory, IssuesFactory, PiecesFactory, PostsFactory, TagsFactory, UsersFactory) {
    this.$scope = $scope;
    this.$timeout = $timeout;
    this.$uibModal = $uibModal;
    this.gridApi = {};
    this.selector = null;
    this.object = {};
    this.ObjectsFactory = {};
    this.uiGridConstants = uiGridConstants;
    this.EntriesFactory = EntriesFactory;
    this.IssuesFactory = IssuesFactory;
    this.PiecesFactory = PiecesFactory;
    this.PostsFactory = PostsFactory;
    this.UsersFactory = UsersFactory;
    this.entries = EntriesFactory.entries;
    this.issues = IssuesFactory.issues;
    this.posts = PostsFactory.posts;
    this.users = UsersFactory.users;

    this.$scope.$on('adminModalClose', ::this.refresh);

    this.contentColDefs = [
      { name: 'id', field: 'id', width: '3%' },
      { name: 'title', field: 'title' },
      { name: 'user', field: 'user.username' },
      { field: 'created_at'},
      { field: 'updated_at'}
    ];

    this.issueColDefs = [
      { name: 'id', field: 'id', width: '3%' },
      { name: 'title', field: 'title' },
      { name: 'authors', field: 'users' },
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
    this.nodeLoaded = false;
    this.issueLoaded = false;

    this.gridOptions.onRegisterApi = (gridApi) => {
      this.gridApi = gridApi;
      gridApi.selection.on.rowSelectionChanged(null, ::this.assignSelectionData);
      gridApi.treeBase.on.rowExpanded(null, ::this.assignTreeData);
    }
  }

  assignSelectionData(row) {
    if (row.entity.issue_id) {
      this.selector = 'piece';
      angular.copy(this.PiecesFactory, this.ObjectsFactory);
    } else if (row.entity.pieces) {
      this.selector = 'issue';
    }
    angular.copy(row.entity, this.object);
  }

  assignTreeData(row) {
    if (!this.nodeLoaded) {
      row.entity.pieces.map((piece) => {
        this.gridOptions.data.splice(this.gridOptions.data.indexOf(row.entity) + 1, 0, piece);
      });
    }
    this.nodeLoaded = true;
  }

  async refresh() {
    await this.ObjectsFactory.query();
    this.gridOptions.data = this.ObjectsFactory[inflect.pluralize(this.selector)];
    this.$scope.$digest();
  }

  renderUsers(users) {
    return users.map((user) => { return user.username }).join(', ');
  }

  resetSelection(callback) {
    angular.copy({}, this.object);
    callback ? callback() : null;
  }

  setIssueData(data) {
    if (!this.issueLoaded) {
      this.gridOptions.data.map((issue) => {
        issue.$$treeLevel = 1;
        issue.users = this.renderUsers(issue.users);
        issue.pieces.map((piece) => {
          piece.users = this.renderUsers(piece.users);
        });
      });
      this.issueLoaded = true;
    }
  }

  async setData(object) {
    this.selector = inflect.singularize(object);
    if (object === 'entries') {
      this.gridOptions.data = this.entries;
      this.gridOptions.columnDefs = this.contentColDefs;
      this.ObjectsFactory = this.EntriesFactory;
    } else if (object === 'posts') {
      this.gridOptions.data = this.posts;
      this.gridOptions.columnDefs = this.contentColDefs;
      this.ObjectsFactory = this.PostsFactory;
    } else if (object === 'issues') {
      this.gridOptions.columnDefs = this.issueColDefs;
      this.gridOptions.data = this.issues;
      this.setIssueData(this.gridOptions.data);
      this.ObjectsFactory = this.IssuesFactory;
    } else if (object === 'users') {
      this.gridOptions.data = this.users;
      this.gridOptions.columnDefs = this.userColDefs;
    }
  }
}
