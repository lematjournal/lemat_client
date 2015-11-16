(function (angular) {

   'use strict';

   angular.module('lematClient')
      .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
         $urlRouterProvider.otherwise('/');
         $stateProvider
            .state('root', {
               abstract: true,
               views: {
                  '@': {},
                  'footer@': {
                     templateUrl: 'scripts/core/layout/footer/footer.html',
                     controller: 'FooterController',
                     controllerAs: 'footerCtrl'
                  },
                  'nav@': {
                     templateUrl: 'scripts/core/layout/nav/nav.html',
                     controller: 'NavController',
                     controllerAs: 'navCtrl'
                  }
               }
            })
            .state('main', {
               url: '/',
               views: {
                  '@': {
                     templateUrl: 'scripts/core/entries/entries.html',
                     controller: 'EntriesController',
                     controllerAs: 'entriesCtrl'
                  },
                  'logo@': {
                     templateUrl: 'scripts/core/layout/logo/logo.html'
                  }
               },
               parent: 'root'
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
               }
            })
            .state('main.issues-detail', {
               url: 'issues/:id',
               views: {
                  '@': {
                     templateUrl: 'scripts/core/issues/issues.detail/issues.detail.html',
                     controller: 'IssuesController',
                     controllerAs: 'issuesCtrl'
                  },
                  'logo@': {}
               }
            })
            .state('main.issues-detail-piece', {
               url: 'issues/:id/:piece',
               views: {
                  '@': {
                     templateUrl: 'scripts/core/issues/issues.detail/piece.html',
                     controller: 'IssuesController',
                     controllerAs: 'issuesCtrl'
                  },
                  'logo@': {}
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
            .state('main.editors', {
               url: 'editors',
               views: {
                  '@': {
                     templateUrl: 'scripts/core/editors/editors.html',
                     controller: 'EditorsController',
                     controllerAs: 'editorsCtrl'
                  },
                  'logo@': {}
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
                  'logo@': {},
                  'title@main.submissions-form': {
                     templateUrl: 'scripts/core/submissions/submissions.form/submissions.title/submissions.title.html'
                  }
               },
               redirectTo: 'main.submissions-info'
            })
            .state('main.submissions-info', {
               url: '/info',
               views: {
                  'logo@': {},
                  'body@main.submissions-form': {
                     templateUrl: 'scripts/core/submissions/submissions.form/submissions.page-1/submissions.page-1.html'
                  }
               },
               parent: 'main.submissions-form'
            })
            .state('main.submissions-upload', {
               url: '/upload',
               views: {
                  'logo@': {},
                  'body@main.submissions-form': {
                     templateUrl: 'scripts/core/submissions/submissions.form/submissions.page-2/submissions.page-2.html'
                  }
               },
               parent: 'main.submissions-form'
            })
            .state('main.submissions-final', {
               url: '/final',
               views: {
                  'logo@': {},
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
                  'logo@': {},
                  'body@main.submissions-form': {
                     templateUrl: 'scripts/core/submissions/submissions.form/submissions.page-4/submissions.page-4.html'
                  },
                  'title@main.submissions-form': {}
               },
               parent: 'main.submissions-form'
            })
            .state('main.about', {
               url: 'about',
               views: {
                  '@': {
                     templateUrl: 'scripts/core/about/about.html'
                  },
                  'logo@': {}
               }
            });
      }]);

   angular.module('lematClient').run(['$rootScope', '$state', function ($rootScope, $state) {
      $rootScope.$on('$stateChangeStart', function (event, to, params) {
         if (to.redirectTo) {
            event.preventDefault();
            $state.go(to.redirectTo, params);
         }
      });
   }]);

   angular.module('lematClient').run(['$rootScope', '$window', function ($rootScope, $window) {
      var window = angular.element($window);
      window.on('beforeunload', function (event) {
         $rootScope.$broadcast('refresh');
      });
   }]);

   angular.module('lematClient').run(['$localStorage', 'PostsFactory', 'UsersFactory', 'ServerUrl', function ($localStorage, PostsFactory, UsersFactory, ServerUrl) {
      (function () {
         if (!UsersFactory.users) {
            UsersFactory.getUsers();
         } else if ($localStorage.usersGrabDate && ($localStorage.usersGrabDate.valueOf() - Date.now().valueOf()) > (1000 * 60 * 60 * 72)) {
            UsersFactory.getUsers();
         }

         if (!PostsFactory.tags) {
            PostsFactory.getTags();
         } else if ($localStorage.tagsGrabDate && ($localStorage.tagsGrabDate.valueOf() - Date.now().valueOf()) > (1000 * 60 * 60)) {
            PostsFactory.getTags();
         }
      })();
   }]);

   //   angular.module('lematClient').run(['$rootScope', '$log', function ($rootScope, $log) {
   //      $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
   //         $log.debug('successfully changed states');
   //
   //         $log.debug('event', event);
   //         $log.debug('toState', toState);
   //         $log.debug('toParams', toParams);
   //         $log.debug('fromState', fromState);
   //         $log.debug('fromParams', fromParams);
   //      });
   //
   //      $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
   //         $log.error('The requested state was not found: ', unfoundState);
   //      });
   //
   //      $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
   //         $log.error('An error occured while changing states: ', error);
   //
   //         $log.debug('event', event);
   //         $log.debug('toState', toState);
   //         $log.debug('toParams', toParams);
   //         $log.debug('fromState', fromState);
   //         $log.debug('fromParams', fromParams);
   //      });
   //         }]);

})(angular);