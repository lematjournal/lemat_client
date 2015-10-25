(function (angular) {

   'use strict';

   angular.module('lematClient')
      .config(['$stateProvider', '$modalStateProvider', '$urlRouterProvider', function ($stateProvider, $modalStateProvider, $urlRouterProvider) {
         $stateProvider
            .state('admin', {
               url: '/admin',
               views: {
                  '@': { 
                     templateUrl: 'scripts/admin/admin.html' 
                  },
                  'nav@': { 
                     templateUrl: 'scripts/admin/layout/nav/nav.html' 
                  },
                  'footer@': {
                     templateUrl: 'scripts/core/layout/footer/footer.html',
                     controller: 'FooterController',
                     controllerAs: 'footerCtrl'
                  }
               },
               resolve: {
                  permission: function(SecFactory) {
                     SecFactory.setPermission('admin');
                  }
               }
            })
            .state('admin.entries', {
               url: '/entries',
               templateUrl: 'scripts/admin/entries/entries.html',
               controller: 'EntriesAdminController',
               controllerAs: 'entriesAdminCtrl'
            })
            .state('admin.entries-create', {
               url: '/entries/create',
               templateUrl: 'scripts/admin/entries/entries.create/entries.create.html',
               controller: 'EntriesAdminController',
               controllerAs: 'entriesAdminCtrl'
            })
            .state('admin.entries-edit', {
               url: '/entries/:entry/edit',
               templateUrl: 'scripts/admin/entries/entries.edit/entries.edit.html',
               controller: 'EntriesAdminController',
               controllerAs: 'entriesAdminCtrl'
            })
            .state('admin.images', {
               url: '/images',
               templateUrl: 'scripts/admin/images/images.html',
               controller: 'ImagesController',
               controllerAs: 'imagesCtrl'
            })
            .state('admin.issues', {
               url: '/issues',
               templateUrl: 'scripts/admin/issues/issues.html',
               controller: 'IssuesAdminController',
               controllerAs: 'issuesAdminCtrl'
            })
            .state('admin.issues-create', {
               url: '/issues/create',
               templateUrl: 'scripts/admin/issues/issues.create/issues.create.html',
               controller: 'IssuesAdminController',
               controllerAs: 'issuesAdminCtrl'
            })
            .state('admin.issues-edit', {
               url: '/issues/:id/edit',
               templateUrl: 'scripts/admin/issues/issues.edit/issues.edit.html',
               controller: 'IssuesAdminController',
               controllerAs: 'issuesAdminCtrl'
            })
            .state('admin.issues-edit-piece', {
               url: '/issues/:id/edit/:piece',
               templateUrl: 'scripts/admin/issues/pieces/pieces.edit/pieces.edit.html',
               controller: 'PiecesAdminController',
               controllerAs: 'piecesAdminCtrl'
            })
            .state('admin.mail', {
               url: '/mail',
               templateUrl: 'scripts/admin/mail/mail.html',
               controller: 'MailController',
               controllerAs: 'mailCtrl'
            })
            .state('admin.mail-detail', {
               url: 'mail/:mail',
               templateUrl: 'scripts/admin/mail/mail.detail/mail.detail.html',
               controller: 'MailController',
               controllerAs: 'mailCtrl'
            })
            .state('admin.posts', {
               url: '/posts',
               templateUrl: 'scripts/admin/posts/posts.html',
               controller: 'PostsAdminController',
               controllerAs: 'postsAdminCtrl'
            })
            .state('admin.posts-create', {
               url: 'posts/create',
               templateUrl: 'scripts/admin/posts/posts.create/posts.create.html',
               controller: 'PostsAdminController',
               controllerAs: 'postsAdminCtrl'
            })
            .state('admin.posts-edit', {
               url: 'posts/:post/edit',
               templateUrl: 'scripts/admin/posts/posts.edit/posts.edit.html',
               controller: 'PostsAdminController',
               controllerAs: 'postsAdminCtrl'
            })
            .state('admin.submissions', {
               url: '/submissions',
               templateUrl: 'scripts/admin/submissions/submissions.html',
               controller: 'SubmissionsController',
               controllerAs: 'submissionsCtrl'
            })
            .state('admin.users', {
               url: '/users',
               templateUrl: 'scripts/admin/users/users.html',
               controller: 'UsersController',
               controllerAs: 'usersCtrl'
            })
            .state('admin.users-create', {
               url: '/users/create',
               templateUrl: 'scripts/admin/users/users.create/users.create.html',
               controller: 'UsersController',
               controllerAs: 'usersCtrl'
            })
            .state('admin.users-edit', {
               url: '/users/:user/edit',
               templateUrl: 'scripts/admin/users/users.edit/users.edit.html',
               controller: 'UsersController',
               controllerAs: 'usersCtrl'
            });
      }]);

})(angular);