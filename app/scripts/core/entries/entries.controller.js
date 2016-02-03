export default class EntriesController {
  /*@ngInject*/
  constructor($scope, $location, $filter, $stateParams, EntriesFactory, IssuesFactory, PostsFactory) {
    this.$scope = $scope;
    this.$location = $location;
    this.$filter = $filter;
    this.posts = PostsFactory.posts;
    this.entries = EntriesFactory.entries;
    this.entry = EntriesFactory.entry;
    this.issues = IssuesFactory.issues;
    this.EntriesFactory = EntriesFactory;
    this.IssuesFactory = IssuesFactory;
    this.PostsFactory = PostsFactory;
    this.pageChangeHandler = (num) => {
      console.log('going to page ' + num);
    };
    this.currentPage = 1;
  }
}
