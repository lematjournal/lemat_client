(function (angular) {

   'use strict';

   angular.module('lematClient')
      .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
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
                  }
               }
            })
            .state('main.issues', {
               url: 'issues',
               views: {
                  '@': {
                     templateUrl: 'scripts/core/issues/issues.html',
                     controller: 'IssuesController',
                     controllerAs: 'issuesCtrl'
                  }
               }
            })
            .state('main.issues-detail', {
               url: 'issues/:id',
               views: {
                  '@': {
                     templateUrl: 'scripts/core/issues/issues.detail/issues.detail.html',
                     controller: 'IssuesController',
                     controllerAs: 'issuesCtrl'
                  }
               }
            })
            .state('main.issues-detail-piece', {
               url: 'issues/:id/:piece',
               views: {
                  '@': {
                     templateUrl: 'scripts/core/issues/issues.detail/piece.html',
                     controller: 'IssuesController',
                     controllerAs: 'issuesCtrl'
                  }
               }
            })
            .state('main.posts', {
               url: 'online',
               views: {
                  '@': {
                     templateUrl: 'scripts/core/posts/posts.html',
                     controller: 'PostsController',
                     controllerAs: 'postsCtrl'
                  }
               }
            })
            .state('main.posts-detail', {
               url: 'online/:post',
               views: {
                  '@': {
                     templateUrl: 'scripts/core/posts/posts.detail/posts.detail.html',
                     controller: 'PostsController',
                     controllerAs: 'postsCtrl'
                  }
               }
            })
            .state('main.profile', {
               url: 'profile',
               views: {
                  '@': {
                     templateUrl: 'scripts/core/profile/profile.html',
                     controller: 'ProfileController',
                     controllerAs: 'profileCtrl'
                  }
               }
            })
            .state('main.profile-detail', {
               url: 'profile/:profile',
               views: {
                  '@': {
                     templateUrl: 'scripts/core/profile/profile.detail/profile.detail.html',
                     controller: 'ProfileController',
                     controllerAs: 'profileCtrl'
                  }
               }
            })
            .state('main.editors', {
               url: 'editors',
               views: {
                  '@': {
                     templateUrl: 'scripts/core/editors/editors.html',
                     controller: 'EditorsController',
                     controllerAs: 'editorsCtrl'
                  }
               }
            })
            .state('main.login', {
               url: 'login',
               views: {
                  '@': {
                     templateUrl: 'scripts/core/login/login.html',
                     controller: 'LoginController',
                     controllerAs: 'loginCtrl'
                  }
               }
            })
            .state('main.submissions', {
               url: 'submissions',
               views: {
                  '@': {
                     templateUrl: 'scripts/core/submissions/submissions.html'
                  }
               }
            })
            .state('main.about', {
               url: 'about',
               views: {
                  '@': {
                     templateUrl: 'scripts/core/about/about.html'
                  }
               }
            });
      }]);

   angular.module('lematClient').run(['$rootScope', '$log', function ($rootScope, $log) {
      $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
         $log.debug('successfully changed states');

         $log.debug('event', event);
         $log.debug('toState', toState);
         $log.debug('toParams', toParams);
         $log.debug('fromState', fromState);
         $log.debug('fromParams', fromParams);
      });

      $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
         $log.error('The requested state was not found: ', unfoundState);
      });

      $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
         $log.error('An error occured while changing states: ', error);

         $log.debug('event', event);
         $log.debug('toState', toState);
         $log.debug('toParams', toParams);
         $log.debug('fromState', fromState);
         $log.debug('fromParams', fromParams);
      });
         }]);

})(angular);