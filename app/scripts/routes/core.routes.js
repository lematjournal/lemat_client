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
          },
          'footer@': {
            templateUrl: 'scripts/components/layout/footer.html',
            controller: 'FooterController',
            controllerAs: 'footerCtrl'
          },
          'nav@': {
            templateUrl: 'scripts/components/layout/nav.html',
            controller: 'NavController',
            controllerAs: 'navCtrl'
          },
          'header@': {
            templateUrl: 'scripts/components/layout/header.html'
          }
        },
        onEnter: (EntriesFactory, PostsFactory, IssuesFactory, UsersFactory) => { /* @ngInject */
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
          },
          'header@': {}
        },
        onEnter: (EntriesFactory, $stateParams) => { /* @ngInject */
          EntriesFactory.getEntry($stateParams.entry);
        }
      })
      .state('main.issues', {
        url: 'issues',
        views: {
          '@': {
            templateUrl: 'scripts/components/issues/issues.html',
            controller: 'IssuesController',
            controllerAs: 'issuesCtrl'
          },
          'header@': {}
        },
        onEnter: (IssuesFactory) => { /* @ngInject */
          IssuesFactory.getIssues();
        }
      })
      .state('main.issues-detail', {
        url: 'issues/:issue',
        views: {
          '@': {
            templateUrl: 'scripts/components/issues/issues.detail/issues.detail.html',
            controller: 'IssuesController',
            controllerAs: 'issuesCtrl'
          },
          'header@': {}
        },
        resolve: {
          promise: (IssuesFactory, $stateParams) => { /* @ngInject */
            return IssuesFactory.getIssue($stateParams.issue);
          }
        }
      })
      .state('main.issues-detail-piece', {
        url: 'issues/:issue/:piece',
        views: {
          '@': {
            templateUrl: 'scripts/components/issues/issues.detail/piece.html',
            controller: 'IssuesController',
            controllerAs: 'issuesCtrl'
          },
          'header@': {}
        },
        onEnter: (PiecesFactory, $stateParams) => { /* @ngInject */
          PiecesFactory.getPiece($stateParams.issue, $stateParams.piece);
        }
      })
      .state('main.posts', {
        url: 'online',
        views: {
          '@': {
            templateUrl: 'scripts/components/posts/posts.html',
            controller: 'PostsController',
            controllerAs: 'postsCtrl'
          },
          'header@': {}
        },
        onEnter: (PostsFactory) => { /* @ngInject */
          PostsFactory.getPosts();
        }
      })
      .state('main.posts-detail', {
        url: 'online/:post',
        views: {
          '@': {
            templateUrl: 'scripts/components/posts/posts.detail/posts.detail.html',
            controller: 'PostsController',
            controllerAs: 'postsCtrl'
          },
          'header@': {}
        },
        onEnter: (PostsFactory, $stateParams) => { /* @ngInject */
          return PostsFactory.getPost($stateParams.post);
        }
      })
      .state('main.editors', {
        url: 'editors',
        views: {
          '@': {
            templateUrl: 'scripts/components/editors/editors.html',
            controller: 'EditorsController',
            controllerAs: 'editorsCtrl'
          },
          'header@': {}
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
          },
          'header@': {}
        }
      })
      .state('main.about', {
        url: 'about',
        views: {
          '@': {
            templateUrl: 'scripts/components/about/about.html'
          },
          'header@': {}
        }
      })
      .state('main.profile', {
        url: 'profile',
        views: {
          '@': {
            templateUrl: 'scripts/components/profile/profile.edit.html',
            controller: 'ProfileController',
            controllerAs: 'profileCtrl'
          },
          'header@': {}
        }
      })
      .state('main.profile-detail', {
        url: 'profile/:profile',
        views: {
          '@': {
            templateUrl: 'scripts/components/profile/profile.detail.html',
            controller: 'ProfileController',
            controllerAs: 'profileCtrl'
          },
          'header@': {}
        },
        onEnter: (UsersFactory, $stateParams) => { /* @ngInject */
          UsersFactory.getUser($stateParams.profile);
        }
      })
      .state('main.submissions', {
        url: 'submissions',
        views: {
          '@': {
            templateUrl: 'scripts/components/submissions/submissions.html'
          },
          'header@': {}
        }
      })
      .state('main.submissions-form', {
        url: 'submissions/form',
        views: {
          '@': {
            templateUrl: 'scripts/components/submissions/submissions.form/submissions.form.html',
            controller: 'SubmissionsController',
            controllerAs: 'submissionsCtrl'
          },
          'header@': {
            templateUrl: 'scripts/components/submissions/submissions.form/submissions.title/submissions.title.html'
          },
          'body@main.submissions-form': {
            templateUrl: 'scripts/components/submissions/submissions.form/submissions.page-1/submissions.page-1.html'
          }
        },
      })
      .state('main.submissions-upload', {
        url: '/upload',
        views: {
          'body@main.submissions-form': {
            templateUrl: 'scripts/components/submissions/submissions.form/submissions.page-2/submissions.page-2.html'
          }
        },
        parent: 'main.submissions-form'
      })
      .state('main.submissions-final', {
        url: '/final',
        views: {
          'body@main.submissions-form': {
            templateUrl: 'scripts/components/submissions/submissions.form/submissions.page-3/submissions.page-3.html'
          },
          'title@main.submissions-form': {
            templateUrl: 'scripts/components/submissions/submissions.form/submissions.title/submissions.title-complete.html'
          }
        },
        parent: 'main.submissions-form'
      })
      .state('main.submissions-thank-you', {
        url: '/thanks',
        views: {
          'body@main.submissions-form': {
            templateUrl: 'scripts/components/submissions/submissions.form/submissions.page-4/submissions.page-4.html'
          },
          'title@main.submissions-form': {}
        },
        parent: 'main.submissions-form'
      })
  }

  /* @ngInject */
  static routeFactory($stateProvider, $urlRouterProvider) {
    CoreRoutes.instance = new CoreRoutes($stateProvider, $urlRouterProvider);
    return CoreRoutes.instance;
  }
}
