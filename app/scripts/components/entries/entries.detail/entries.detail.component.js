import { Component, Inject, Resolve } from 'ng-forward';
import EntriesComponent from '../entries.component';
import EntriesFactory from '../entries.factory';
import ToTrusted from '../../../filters/to-trusted.filter';

@Component({
  selector: 'entries-detail',
  controllerAs: 'entriesDetailCtrl',
  pipes: [ToTrusted],
  providers: [EntriesFactory],
  templateUrl: './scripts/components/entries/entries.detail/entries.detail.html'
})

@Inject('$scope', '$stateParams', EntriesFactory)
export default class EntriesDetailComponent extends EntriesComponent {
  @Resolve()
  @Inject('$stateParams', EntriesFactory)
  static resolve($stateParams, EntriesFactory) {
    return EntriesFactory.get($stateParams.entry);
  }

  constructor($scope, $stateParams, EntriesFactory) {
    super($scope, $stateParams, EntriesFactory);
  }
}
