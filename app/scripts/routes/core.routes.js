import EntriesFactory from '../core/core.module';
import UsersFactory from '../services/factories.module';
import PostsFactory from '../core/core.module';
import IssuesFactory from '../core/core.module';

export default class CoreRoutes {
  /*@ngInject*/
  constructor($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('main', {
        url: '/',
        views: {
          '@': {
            templateUrl: 'scripts/core/entries/entries.html',
            controller: 'EntriesController',
            controllerAs: 'entriesCtrl'
          },
          'footer@': {
            templateUrl: 'scripts/core/layout/footer.html',
            controller: 'FooterController',
            controllerAs: 'footerCtrl'
          },
          'nav@': {
            templateUrl: 'scripts/core/layout/nav.html',
            controller: 'NavController',
            controllerAs: 'navCtrl'
          },
          'logo@': {
            templateUrl: 'scripts/core/layout/logo.html'
          }
        },
        onEnter: (EntriesFactory, PostsFactory, IssuesFactory, UsersFactory) => {
          EntriesFactory.getEntries() && PostsFactory.getPosts() && IssuesFactory.getIssues() && UsersFactory.checkStoredUsers();
        }
      })
      .state('main.entries-detail', {
        url: 'news/:entry',
        views: {
          '@': {
            templateUrl: 'scripts/core/entries/entries.detail/entries.detail.html',
            controller: 'EntriesController',
            controllerAs: 'entriesCtrl'
          },
          'logo@': {}
        },
        onEnter: (EntriesFactory, $stateParams) => {
          EntriesFactory.getEntry($stateParams.entry);
        }
      })
      .state('main.issues', {
        url: 'issues',
        views: {
          '@': {
            templateUrl: 'scripts/core/issues/issues.html',
            controller: 'IssuesController',
            controllerAs: 'issuesCtrl'
          },
          'logo@': {}
        },
        onEnter: (IssuesFactory) => {
          IssuesFactory.getIssues();
        }
      })
      .state('main.issues-detail', {
        url: 'issues/:issue',
        views: {
          '@': {
            templateUrl: 'scripts/core/issues/issues.detail/issues.detail.html',
            controller: 'IssuesController',
            controllerAs: 'issuesCtrl'
          },
          'logo@': {}
        },
        onEnter: (IssuesFactory, $stateParams) => {
          IssuesFactory.getIssue($stateParams.issue);
        }
      })
      .state('main.issues-detail-piece', {
        url: 'issues/:issue/:piece',
        views: {
          '@': {
            templateUrl: 'scripts/core/issues/issues.detail/piece.html',
            controller: 'IssuesController',
            controllerAs: 'issuesCtrl'
          },
          'logo@': {}
        },
        onEnter: (PiecesFactory, $stateParams) => {
          PiecesFactory.getPiece($stateParams.issue, $stateParams.piece);
        }
      })
      .state('main.posts', {
        url: 'online',
        views: {
          '@': {
            templateUrl: 'scripts/core/posts/posts.html',
            controller: 'PostsController',
            controllerAs: 'postsCtrl'
          },
          'logo@': {}
        },
        onEnter: (PostsFactory) => {
          PostsFactory.getPosts();
        }
      })
      .state('main.posts-detail', {
        url: 'online/:post',
        views: {
          '@': {
            templateUrl: 'scripts/core/posts/posts.detail/posts.detail.html',
            controller: 'PostsController',
            controllerAs: 'postsCtrl'
          },
          'logo@': {}
        },
        onEnter: (PostsFactory, $stateParams) => {
          PostsFactory.getPost($stateParams.post);
        }
      })
      .state('main.editors', {
        url: 'editors',
        views: {
          '@': {
            templateUrl: 'scripts/core/editors/editors.html',
            controller: 'EditorsController',
            controllerAs: 'editorsCtrl'
          },
          'logo@': {}
        },
        onEnter: (UsersFactory, $stateParams) => {
          UsersFactory.getUsers();
        }
      })
      .state('main.login', {
        url: 'login',
        views: {
          '@': {
            templateUrl: 'scripts/core/login/login.html',
            controller: 'LoginController',
            controllerAs: 'loginCtrl'
          },
          'logo@': {}
        }
      })
      .state('main.about', {
        url: 'about',
        views: {
          '@': {
            templateUrl: 'scripts/core/about/about.html'
          },
          'logo@': {}
        }
      })
      .state('main.profile', {
        url: 'profile',
        views: {
          '@': {
            templateUrl: 'scripts/core/profile/profile.html',
            controller: 'ProfileController',
            controllerAs: 'profileCtrl'
          },
          'logo@': {}
        }
      })
      .state('main.profile-detail', {
        url: 'profile/:profile',
        views: {
          '@': {
            templateUrl: 'scripts/core/profile/profile.detail/profile.detail.html',
            controller: 'ProfileController',
            controllerAs: 'profileCtrl'
          },
          'logo@': {}
        }
      })
      .state('main.submissions', {
        url: 'submissions',
        views: {
          '@': {
            templateUrl: 'scripts/core/submissions/submissions.html'
          },
          'logo@': {}
        }
      })
      .state('main.submissions-form', {
        url: 'submissions/form',
        views: {
          '@': {
            templateUrl: 'scripts/core/submissions/submissions.form/submissions.form.html',
            controller: 'SubmissionsController',
            controllerAs: 'submissionsCtrl'
          },
          'logo@': {
            templateUrl: 'scripts/core/submissions/submissions.form/submissions.title/submissions.title.html'
          },
          'body@main.submissions-form': {
            templateUrl: 'scripts/core/submissions/submissions.form/submissions.page-1/submissions.page-1.html'
          }
        },
      })
      .state('main.submissions-upload', {
        url: '/upload',
        views: {
          'body@main.submissions-form': {
            templateUrl: 'scripts/core/submissions/submissions.form/submissions.page-2/submissions.page-2.html'
          }
        },
        parent: 'main.submissions-form'
      })
      .state('main.submissions-final', {
        url: '/final',
        views: {
          'body@main.submissions-form': {
            templateUrl: 'scripts/core/submissions/submissions.form/submissions.page-3/submissions.page-3.html'
          },
          'title@main.submissions-form': {
            templateUrl: 'scripts/core/submissions/submissions.form/submissions.title/submissions.title-complete.html'
          }
        },
        parent: 'main.submissions-form'
      })
      .state('main.submissions-thank-you', {
        url: '/thanks',
        views: {
          'body@main.submissions-form': {
            templateUrl: 'scripts/core/submissions/submissions.form/submissions.page-4/submissions.page-4.html'
          },
          'title@main.submissions-form': {}
        },
        parent: 'main.submissions-form'
      })
  }

  static routeFactory($stateProvider, $urlRouterProvider) {
    CoreRoutes.instance = new CoreRoutes($stateProvider, $urlRouterProvider);
    return CoreRoutes.instance;
  }
}
