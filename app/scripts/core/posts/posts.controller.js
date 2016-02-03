export default class PostsController {
  /*@ngInject*/
  constructor($scope, $location, $stateParams, PostsFactory) {
    this.posts = PostsFactory.posts;
    this.post = PostsFactory.post;
    $scope.popover = {
      templateUrl: 'tag-popover.template.html',
    };
  }
}
