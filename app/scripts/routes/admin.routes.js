import { EntriesFactory, ImagesFactory, IssuesFactory, UsersFactory } from '../components/components.module';

export default class AdminRoutes {
  /*@ngInject*/
  constructor($stateProvider) {
    $stateProvider.state('admin', {
        url: '/admin',
        views: {
          'nav@': {
            templateUrl: 'scripts/components/layout/nav.html',
            controller: 'NavController',
            controllerAs: 'navCtrl',
          },
          'header@': {
            templateUrl: 'scripts/components/layout/admin.html',
          },
          '@': {
            templateUrl: 'scripts/components/layout/main.html'
          }
        }
      })
      .state('admin.entries', {
        url: '/entries',
        views: {
          '@': {
            templateUrl: 'scripts/components/entries/entries.admin.html',
            controller: 'EntriesAdminController',
            controllerAs: 'entriesAdminCtrl'
          }
        },
        onEnter: (EntriesFactory) => { /*@ngInject*/
          EntriesFactory.getEntries();
        }
      })
      .state('admin.entries-create', {
        url: '/entries/create',
        views: {
          '@': {
            templateUrl: 'scripts/components/entries/entries.edit/entries.edit.html',
            controller: 'EntriesAdminController',
            controllerAs: 'entriesAdminCtrl'
          }
        }
      })
      .state('admin.entries-edit', {
        url: '/entries/:entry/edit',
        views: {
          '@': {
            templateUrl: 'scripts/components/entries/entries.edit/entries.edit.html',
            controller: 'EntriesAdminController',
            controllerAs: 'entriesAdminCtrl'
          },
          onEnter: (EntriesFactory, $stateParams) => { /*@ngInject*/
            EntriesFactory.getEntry($stateParams.entry);
          }
        }
      })
      .state('admin.images', {
        url: '/images',
        views: {
          '@': {
            templateUrl: 'scripts/components/images/images.html',
            controller: 'ImagesController',
            controllerAs: 'imagesCtrl'
          }
        },
        onEnter: (ImagesFactory) => { /* @ngInject */
          ImagesFactory.getImages();
        }
      })
      .state('admin.issues', {
        url: '/issues',
        views: {
          '@': {
            templateUrl: 'scripts/components/issues/issues.admin.html',
            controller: 'IssuesAdminController',
            controllerAs: 'issuesAdminCtrl'
          }
        },
        onEnter: (IssuesFactory) => { /* @ngInject */
          IssuesFactory.getIssues();
        }
      })
      .state('admin.issues-create', {
        url: '/issues/create',
        views: {
          '@': {
            templateUrl: 'scripts/components/issues/issues.edit/issues.edit.html',
            controller: 'IssuesAdminController',
            controllerAs: 'issuesAdminCtrl'
          }
        },
        onEnter: (IssuesFactory) => { /* @ngInject */
          IssuesFactory.getIssues();
        }
      })
      .state('admin.issues-edit', {
        url: '/issues/:issue/edit',
        views: {
          '@': {
            templateUrl: 'scripts/components/issues/issues.edit/issues.edit.html',
            controller: 'IssuesAdminController',
            controllerAs: 'issuesAdminCtrl'
          }
        },
        onEnter: (IssuesFactory, $stateParams) => { /* @ngInject */
          IssuesFactory.getIssue($stateParams.issue);
        }
      })
      .state('admin.issues-edit-piece', {
        url: '/issues/:issue/edit/:piece',
        views: {
          '@': {
            templateUrl: 'scripts/components/issues/pieces/pieces.edit/pieces.edit.html',
            controller: 'PiecesAdminController',
            controllerAs: 'piecesAdminCtrl'
          }
        },
        onEnter: (IssuesFactory, $stateParams) => { /* @ngInject */
          IssuesFactory.getIssues($stateParams.issue, $stateParams.piece);
        }
      })
      .state('admin.posts', {
        url: '/posts',
        views: {
          '@': {
            templateUrl: 'scripts/components/posts/posts.admin.html',
            controller: 'PostsAdminController',
            controllerAs: 'postsAdminCtrl'
          }
        },
        onEnter: (PostsFactory) => { /* @ngInject */
          PostsFactory.getPosts();
        }
      })
      .state('admin.posts-create', {
        url: '/posts/create',
        views: {
          '@': {
            templateUrl: 'scripts/components/posts/posts.create/posts.create.html',
            controller: 'PostsAdminController',
            controllerAs: 'postsAdminCtrl'
          }
        }
      })
      .state('admin.posts-edit', {
        url: '/posts/:post/edit',
        views: {
          '@': {
            templateUrl: 'scripts/components/posts/posts.edit/posts.edit.html',
            controller: 'PostsAdminController',
            controllerAs: 'postsAdminCtrl'
          }
        }
      })
    }

  static routeFactory($stateProvider) {
    AdminRoutes.instance = new AdminRoutes($stateProvider);
    return AdminRoutes.instance;
  }
}
