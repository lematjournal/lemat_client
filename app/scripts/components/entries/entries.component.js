import { Component, Inject, Resolve } from 'ng-forward';
import EntriesFactory from './entries.factory';

@Component({
  selector: 'entries',
  providers: [EntriesFactory],
  templateUrl: './scripts/components/entries/entries.html',
  controllerAs: 'entriesCtrl'
})

@Inject('$scope', '$rootScope', '$stateParams', EntriesFactory)
export default class EntriesComponent {
  @Resolve()
  @Inject(EntriesFactory)
  static resolve(EntriesFactory) {
    return EntriesFactory.query();
  }

  constructor($scope, $rootScope, $stateParams, EntriesFactory) {
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.identifier = $stateParams.entry;
    this.EntriesFactory = EntriesFactory;
    this.entries = EntriesFactory.entries;
    this.entry = EntriesFactory.entry;
    this.$scope.$on('entryTagFilter', ::this.setFilter);
  }

  setFilter(event, tagFilter) {
    console.log('called', tagFilter);
    // this.$rootScope.tagFilter = tagFilter;
    let filteredEntries = [];
    for (let i = 0; this.entries.length > i; i += 1) {
      for (let j = 0; this.entries[i].tag_names.length > j; j += 1) {
        console.log(this.entries[i].tag_names[j]);
        if (this.entries[i].tag_names[j] === tagFilter) {
          filteredEntries.push(this.entries[i])
        }
      }
    }
    this.entries = filteredEntries;
  }
}
