import { Component, Inject, Resolve } from 'ng-forward';
import EntriesFactory from './entries.factory';
import PostsFactory from '../posts/posts.factory';
import IssuesFactory from '../issues/issues.factory';
import UsersFactory from '../users/users.factory';

@Component({
  selector: 'entries',
  providers: [EntriesFactory, PostsFactory, IssuesFactory],
  templateUrl: './scripts/components/entries/entries.html'
})

@Inject('$scope', '$stateParams', EntriesFactory, PostsFactory, IssuesFactory)
export default class EntriesComponent {
  // @Resolve()
  // @Inject(EntriesFactory, PostsFactory, IssuesFactory)
  // static resolve(EntriesFactory, PostsFactory, IssuesFactory) {
  //   if (EntriesFactory.entries.length === 0 || PostsFactory.posts.length === 0) {
  //     EntriesFactory.getEntries() && PostsFactory.getPosts() && IssuesFactory.getIssues() && UsersFactory.checkStoredUsers();
  //   }
  // }

  constructor($scope, $stateParams, EntriesFactory, PostsFactory, IssuesFactory) {
    this.$scope = $scope;
    this.$stateParams = $stateParams;
    this.identifier = $stateParams.entry;
    this.EntriesFactory = EntriesFactory;
    this.IssuesFactory = IssuesFactory;
    this.PostsFactory = PostsFactory;
    this.posts = PostsFactory.posts;
    this.entries = EntriesFactory.entries;
    this.entry = EntriesFactory.entry;
    this.issues = IssuesFactory.issues;
  }
}
