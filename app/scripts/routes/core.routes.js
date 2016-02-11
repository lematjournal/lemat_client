import { EntriesFactory, UsersFactory, PostsFactory, IssuesFactory } from '../components/components.module';

export default class CoreRoutes {
  /*@ngInject*/
  constructor($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('main', {
        url: '/',
        views: {
          '@': {
            templateUrl: 'scripts/components/entries/entries.html',
            controller: 'EntriesController',
            controllerAs: 'entriesCtrl'
          }
        },
        onEnter: (EntriesFactory, PostsFactory, IssuesFactory, UsersFactory) => {
          if (EntriesFactory.entries.length === 0 || PostsFactory.posts.length === 0)
            EntriesFactory.getEntries() && PostsFactory.getPosts() && IssuesFactory.getIssues() && UsersFactory.checkStoredUsers();
        }
      })
      .state('main.entries-detail', {
        url: 'news/:entry',
        views: {
          '@': {
            templateUrl: 'scripts/components/entries/entries.detail/entries.detail.html',
            controller: 'EntriesController',
            controllerAs: 'entriesCtrl'
          }
        },
        resolve: {
          promise: (EntriesFactory, $stateParams) => {
              return EntriesFactory.getEntry($stateParams.entry);
            }
          }
      })
      .state('main.issues', {
        url: 'issues',
        views: {
          '@': {
            templateUrl: 'scripts/components/issues/issues.html',
            controller: 'IssuesController',
            controllerAs: 'issuesCtrl'
          }
        },
        onEnter: (IssuesFactory) => { /* @ngInject */
          if (IssuesFactory.issues.length === 0) IssuesFactory.getIssues();
        }
      })
      .state('main.issues-detail', {
        url: 'issues/:issue',
        views: {
          '@': {
            templateUrl: 'scripts/components/issues/issues.detail/issues.detail.html',
            controller: 'IssuesController',
            controllerAs: 'issuesCtrl'
          }
        },
        onEnter: (IssuesFactory, $stateParams) => { /* @ngInject */
          if ($stateParams.issue !== IssuesFactory.issue.id) return IssuesFactory.getIssue($stateParams.issue);
        }
      })
      .state('main.issues-detail-piece', {
        url: 'issues/:issue/:piece',
        views: {
          '@': {
            templateUrl: 'scripts/components/issues/issues.detail/piece.html',
            controller: 'IssuesController',
            controllerAs: 'issuesCtrl'
          }
        },
        resolve: {
          promise: (PiecesFactory, $stateParams) => { /* @ngInject */
            return PiecesFactory.getPiece($stateParams.issue, $stateParams.piece);
          }
        }
      })
      .state('main.posts', {
        url: 'online',
        views: {
          '@': {
            templateUrl: 'scripts/components/posts/posts.html',
            controller: 'PostsController',
            controllerAs: 'postsCtrl'
          }
        },
        onEnter: (PostsFactory) => { /* @ngInject */
          if (PostsFactory.posts.length === 0) PostsFactory.getPosts();
        }
      })
      .state('main.posts-detail', {
        url: 'online/:post',
        views: {
          '@': {
            templateUrl: 'scripts/components/posts/posts.detail/posts.detail.html',
            controller: 'PostsController',
            controllerAs: 'postsCtrl'
          }
        },
        resolve: {
          promise: (PostsFactory, $stateParams) => { /* @ngInject */
            return PostsFactory.getPost($stateParams.post);
          }
        }
      })
      .state('main.editors', {
        url: 'editors',
        views: {
          '@': {
            templateUrl: 'scripts/components/editors/editors.html',
            controller: 'EditorsController',
            controllerAs: 'editorsCtrl'
          }
        },
        onEnter: (UsersFactory, $stateParams) => { /* @ngInject */
          UsersFactory.getUsers();
        }
      })
      .state('main.login', {
        url: 'login',
        views: {
          '@': {
            templateUrl: 'scripts/components/login/login.html',
            controller: 'LoginController',
            controllerAs: 'loginCtrl'
          }
        }
      })
      .state('main.about', {
        url: 'about',
        views: {
          '@': {
            templateUrl: 'scripts/components/about/about.html'
          }
        }
      })
      .state('main.profile', {
        url: 'profile',
        views: {
          '@': {
            templateUrl: 'scripts/components/profile/profile.edit.html',
            controller: 'ProfileController',
            controllerAs: 'profileCtrl'
          }
        }
      })
      .state('main.profile-detail', {
        url: 'profile/:profile',
        views: {
          '@': {
            templateUrl: 'scripts/components/profile/profile.detail.html',
            controller: 'ProfileController',
            controllerAs: 'profileCtrl'
          }
        },
        resolve: {
          promise: (UsersFactory, $stateParams) => { /* @ngInject */
            return UsersFactory.getUser($stateParams.profile);
          }
        }
      })
      .state('main.submissions', {
        url: 'submissions',
        views: {
          '@': {
            templateUrl: 'scripts/components/submissions/submissions.html'
          }
        }
      })
      .state('main.submissions-form', {
        url: 'submissions/form',
        views: {
          '@': {
            templateUrl: 'scripts/components/submissions/submissions.form/form.html'
          }
        }
      })
  }

  /* @ngInject */
  static routeFactory($stateProvider, $urlRouterProvider) {
    CoreRoutes.instance = new CoreRoutes($stateProvider, $urlRouterProvider);
    return CoreRoutes.instance;
  }
}
