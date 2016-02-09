import { Controller } from 'a1atscript';

@Controller('PostsController', ['$scope', '$rootScope', 'PostsFactory'])
export default class PostsController {
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
