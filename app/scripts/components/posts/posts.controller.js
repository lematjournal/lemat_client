export default class PostsController {
  /*@ngInject*/
  constructor($scope, PostsFactory) {
    this.$scope = $scope;
    this.PostsFactory = PostsFactory;
    this.posts = PostsFactory.posts;
    this.post = PostsFactory.post;
    $scope.popover = {
      templateUrl: 'tag-popover.template.html',
    };
  }
}
