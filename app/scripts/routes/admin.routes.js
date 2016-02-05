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
        resolve: {
          promise: (EntriesFactory) => { /*@ngInject*/
            return EntriesFactory.getEntries();
          }
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
          resolve: {
            promise: (EntriesFactory, $stateParams) => { /*@ngInject*/
              if (EntriesFactory.entry === {}) return getEntry($stateParams.entry);
            }
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
        resolve: {
          promise: (ImagesFactory) => { /*@ngInject*/
            if (ImagesFactory.images.length === 0) return ImagesFactory.getImages();
          }
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
        resolve: {
            promise: (IssuesFactory) => { /*@ngInject*/
              if (IssuesFactory.issues.length === 0) return IssuesFactory.getIssues();
          }
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
        resolve: {
          promise: (IssuesFactory, $stateParams) => { /*@ngInject*/
            return IssuesFactory.getIssue($stateParams.issue);
          }
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
        resolve: {
          promise: (IssuesFactory, $stateParams) => { /*@ngInject*/
            if (IssuesFactory.issue === {}) {
              return IssuesFactory.getIssues($stateParams.issue, $stateParams.piece);
            }
          }
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
        resolve: {
          promise: (PostsFactory, UsersFactory) => { /*@ngInject*/
            if (PostsFactory.posts.length === 0 || UsersFactory.users.length === 0) {
              return PostsFactory.getPosts() && UsersFactory.getUsers();
            }
          }
        }
      })
      .state('admin.posts-create', {
        url: '/posts/create',
        views: {
          '@': {
            templateUrl: 'scripts/components/posts/posts.create/posts.edit.html',
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
        },
        resolve: {
          promise: (PostsFactory, $stateParams) => { /*@ngInject*/
            return PostsFactory.getPost($stateParams.post);
          }
        }
      })
      .state('admin.submissions', { // todo: move submissions initializer here
        url: '/submissions',
        views: {
          '@': {
            templateUrl: 'scripts/components/submissions/submissions.admin.html',
            controller: 'SubmissionsAdminController',
            controllerAs: 'submissionsCtrl'
          }
        }
      })
      .state('admin.submissions-comments', {
          url: '/submissions/:submission/comments',
          views: {
            '@': {
              templateUrl: 'scripts/components/submissions/comments/comments.html',
              controller: 'SubmissionsAdminController',
              controllerAs: 'submissionsCtrl'
            }
          },
          resolve: {
            promise: (SubmissionsFactory) => { /*@ngInject*/
              return SubmissionsFactory.getSubmissions($stateParams.submission);
            }
          }
        })
        .state('admin.submissions-detail', {
          url: '/submissions/:submission',
          views: {
            '@': {
              templateUrl: 'scripts/components/submissions/submissions.detail/submissions.detail.html',
              controller: 'SubmissionsAdminController',
              controllerAs: 'submissionsCtrl'
            }
          },
          resolve: {
            promise: (SubmissionsFactory, $stateParams) => { /*@ngInject*/
              return SubmissionsFactory.getSubmission($stateParams.submission);
            }
          }
        })
        .state('admin.submissions-edit', {
          url: '/submissions/:submission/edit',
          views: {
            '@': {
              templateUrl: 'scripts/components/submissions/submissions.edit/submissions.edit.html',
              controller: 'SubmissionsAdminController',
              controllerAs: 'submissionsCtrl'
            }
          },
          resolve: {
            promise: (SubmissionsFactory, $stateParams) => { /*@ngInject*/
              return SubmissionsFactory.getSubmission($stateParams.submission);
            }
          }
        })
        .state('admin.users', {
            url: '/users',
            views: {
              '@': {
                templateUrl: 'scripts/components/users/users.admin.html',
                controller: 'UsersController',
                controllerAs: 'usersCtrl'
              }
            },
            resolve: {
              promise: (UsersFactory) => { /*@ngInject*/
                return UsersFactory.getUsers();
              }
            }
          })
          .state('admin.users-create', {
            url: '/users/create',
            views: {
              '@': {
                templateUrl: 'scripts/components/users/users.create/users.create.html',
                controller: 'UsersController',
                controllerAs: 'usersCtrl'
              }
            },
            resolve: {
              promise: (UsersFactory) => { /*@ngInject*/
                return UsersFactory.resetUser();
              }
            }
          })
          .state('admin.users-edit', {
            url: '/users/:user/edit',
            views: {
              '@': {
                templateUrl: 'scripts/components/users/users.edit/users.edit.html',
                controller: 'UsersController',
                controllerAs: 'usersCtrl'
              }
            },
            resolve: {
              promise: (UsersFactory, $stateParams) => { /*@ngInject*/
                return UsersFactory.getUser($stateParams.user);
              }
            }
          });
      }

  static routeFactory($stateProvider) {
    AdminRoutes.instance = new AdminRoutes($stateProvider);
    return AdminRoutes.instance;
  }
}
