export default class PostsController {
  /*@ngInject*/
  constructor($scope, $rootScope, PostsFactory) {
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.PostsFactory = PostsFactory;
    this.posts = PostsFactory.posts;
    this.post = PostsFactory.post;
    $scope.popover = {
      templateUrl: 'tag-popover.template.html',
    };
  }

  setFilter(filter) {
    this.$rootScope.filters.tags = filter;
  }
}
