import { Component, Inject, Resolve } from 'ng-forward';
import ToTrusted from '../../../filters/to-trusted.filter';
import PostsComponent from '../posts.component';
import PostsFactory from '../posts.factory';

import 'angular-deckgrid';
import 'angular-youtube-embed';

@Component({
  selector: 'posts-detail',
  controllerAs: 'postsDetailCtrl',
  pipe: [ToTrusted],
  providers: ['youtube-embed', PostsFactory],
  templateUrl: './scripts/components/posts/posts.detail/posts.detail.html'
})

@Inject('$scope', '$rootScope', PostsFactory)
export default class PostsDetailComponent extends PostsComponent {
  @Resolve()
  @Inject('$stateParams', PostsFactory)
  static resolve($stateParams, PostsFactory) {
    return PostsFactory.getPost($stateParams.post);
  }
  constructor($scope, $rootScope, PostsFactory) {
    super($scope, $rootScope, PostsFactory);
  }
}
