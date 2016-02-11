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
  // @Resolve()
  // @Inject(EntriesFactory, PostsFactory, IssuesFactory)
  // static resolve(EntriesFactory, PostsFactory, IssuesFactory) {
  //   if (EntriesFactory.entries.length === 0 || PostsFactory.posts.length === 0) {
  //     EntriesFactory.getEntries() && PostsFactory.getPosts() && IssuesFactory.getIssues() && UsersFactory.checkStoredUsers();
  //   }
  // }

  constructor($scope, $stateParams, EntriesFactory) {
    this.$scope = $scope;
    this.$stateParams = $stateParams;
    this.identifier = $stateParams.entry;
    this.EntriesFactory = EntriesFactory;
    this.entries = EntriesFactory.entries;
    this.entry = EntriesFactory.entry;
  }
}
