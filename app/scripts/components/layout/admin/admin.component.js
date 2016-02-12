import { Component, Inject } from 'ng-forward';
import EntriesFactory from '../../entries/entries.factory';
import 'reflect-metadata';
import 'angular-ui-grid/ui-grid';

@Component({
  selector: 'admin',
  templateUrl: './scripts/components/layout/admin/admin.html',
  controllerAs: 'adminCtrl',
  providers: ['ui.grid', EntriesFactory]
})

@Inject('$scope', EntriesFactory)
export default class AdminComponent {
  constructor($scope, EntriesFactory) {
    this.$scope = $scope;
    this.gridOptions = {
      columnDefs: [
        { name: 'id', field: 'id' },
        { name: 'title', field: 'title'},
        { name: 'user', field: 'user.username' },
        { field: 'created_at'},
        { field: 'updated_at'}
      ]
    };
    this.EntriesFactory = EntriesFactory;
    this.entries = EntriesFactory.entries;
    this.gridOptions.data = this.entries;
  }

  ngOnInit() {
    this.EntriesFactory.getEntries();
  }
}
