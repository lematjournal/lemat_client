import { Component, Inject, Resolve } from 'ng-forward';
import PostsFactory from './posts.factory';
import ToTrusted from '../../filters/to-trusted.filter';
import Thumbnail from '../../filters/thumbnail.filter';

import 'angular-deckgrid';

@Component({
  selector: 'posts',
  controllerAs: 'postsCtrl',
  pipes: [ToTrusted, Thumbnail],
  providers: ['akoenig.deckgrid', PostsFactory],
  templateUrl: './scripts/components/posts/posts.html'
})

@Inject('$scope', '$rootScope', PostsFactory)
export default class PostsComponent {
  @Resolve()
  @Inject(PostsFactory)
  static resolve(PostsFactory) {
    if (PostsFactory.posts.length === 0) return PostsFactory.getPosts();
  }
  constructor($scope, $rootScope, PostsFactory) {
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.posts = PostsFactory.posts;
    this.post = PostsFactory.post;
    this.filters = $rootScope.filters;
    $scope.popover = {
      templateUrl: 'tag-popover.template.html',
    };
  }

  setFilter(filter) {
    this.$rootScope.filters.tags = filter;
  }
}
