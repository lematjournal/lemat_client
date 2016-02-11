import { Component, Inject, Resolve } from 'ng-forward';
import EntriesComponent from '../entries.component';
import EntriesFactory from '../entries.factory';
import uiRouter from 'angular-ui-router';

@Component({
  selector: 'entriesDetail',
  controllerAs: 'entriesDetailCtrl',
  providers: [uiRouter, EntriesFactory],
  templateUrl: './scripts/components/entries/entries.detail/entries.detail.html'
})

@Inject('$scope', '$stateParams', EntriesFactory)
export default class EntriesDetailComponent extends EntriesComponent {
  @Resolve()
  @Inject('$stateParams', EntriesFactory)
  static resolve($stateParams, EntriesFactory) {
    return EntriesFactory.getEntry($stateParams.entry);
  }

  constructor($scope, $stateParams, EntriesFactory) {
    super($scope, $stateParams, EntriesFactory);
  }
}
