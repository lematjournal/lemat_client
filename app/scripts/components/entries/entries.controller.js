export default class EntriesController {
  /*@ngInject*/
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
