import { Component, Inject, Resolve } from 'ng-forward';
import EntriesFactory from './entries.factory';

@Component({
  selector: 'entries',
  providers: [EntriesFactory],
  templateUrl: './scripts/components/entries/entries.html',
  controllerAs: 'entriesCtrl'
})

@Inject('$scope', '$stateParams', EntriesFactory)
export default class EntriesComponent {
  @Resolve()
  @Inject(EntriesFactory)
  static resolve(EntriesFactory) {
    EntriesFactory.query();
  }

  constructor($scope, $stateParams, EntriesFactory) {
    this.$scope = $scope;
    this.identifier = $stateParams.entry;
    this.EntriesFactory = EntriesFactory;
    this.entries = EntriesFactory.entries;
    this.entry = EntriesFactory.entry;
  }
}
