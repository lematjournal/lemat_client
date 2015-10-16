'use strict';

angular.module('lematClient.admin.routes').config(['$routeProvider', function ($routeProvider) {
   $routeProvider
   // admin control panel
      .when('/admin', {
         templateUrl: 'views/admin/control-panel.html',
         resolve: {
            permission: function (SecFactory) {
               SecFactory.setPermission('admin');
            }
         }
      })
      // entry admin
      .when('/admin/entries', {
         templateUrl: 'views/admin/entry-admin.html',
         resolve: {
            permission: function (SecFactory) {
               SecFactory.setPermission('admin');
            }
         }
      })
      // create entry
      .when('/admin/entries/create', {
         templateUrl: 'views/admin/forms/entry-create.html',
         resolve: {
            permission: function (SecFactory) {
               SecFactory.setPermission('editor');
            }
         }
      })
      // entry edit
      .when('/admin/entries/:entry/edit', {
         templateUrl: 'views/admin/forms/entry-edit.html',
         resolve: {
            permission: function (SecFactory) {
               SecFactory.setPermission('admin');
            }
         }
      })
      // issue admin
      .when('/admin/issues', {
         templateUrl: 'views/admin/issue-admin.html',
         resolve: {
            permission: function (SecFactory) {
               SecFactory.setPermission('admin');
            }
         }
      })
      // edit issue
      .when('/admin/issues/:id/edit', {
         templateUrl: 'views/admin/forms/issue-edit.html',
         resolve: {
            permission: function (SecFactory) {
               SecFactory.setPermission('admin');
            }
         }
      })
      // piece view
      .when('/admin/issues/:id/:piece', {
         templateUrl: 'views/admin/piece-preview.html',
         resolve: {
            permission: function (SecFactory) {
               SecFactory.setPermission('admin');
            }
         }
      })
      // edit pieces attached to issue
      .when('/admin/issues/:id/:piece/edit', {
         templateUrl: 'views/admin/forms/piece-edit.html',
         resolve: {
            permission: function (SecFactory) {
               SecFactory.setPermission('admin');
            }
         }
      })
      // add pieces to issue
      .when('/admin/issues/:id/pieces/create', {
         templateUrl: 'views/admin/forms/piece-create.html',
         resolve: {
            permission: function (SecFactory) {
               SecFactory.setPermission('admin');
            }
         }
      })
      // admin for posts
      .when('/admin/posts', {
         templateUrl: 'views/admin/online-admin.html',
         resolve: {
            permission: function (SecFactory) {
               SecFactory.setPermission('admin');
            }
         }
      })
      // create post view
      .when('/admin/posts/create', {
         templateUrl: 'views/admin/forms/post-create.html',
         resolve: {
            permission: function (SecFactory) {
               SecFactory.setPermission('editor');
            }
         }
      })
      // edit post view
      .when('/admin/posts/:post/edit', {
         templateUrl: 'views/admin/forms/post-edit.html',
         resolve: {
            permission: function (SecFactory) {
               SecFactory.setPermission('editor');
            }
         }
      })
      // user admin
      .when('/admin/users', {
         templateUrl: 'views/admin/user-admin.html',
         resolve: {
            permission: function (SecFactory) {
               SecFactory.setPermission('admin');
            }
         }
      })
      // create user view
      .when('/admin/users/create', {
         templateUrl: 'views/admin/forms/user-create.html',
         resolve: {
            permission: function (SecFactory) {
               SecFactory.setPermission('admin');
            }
         }
      })
      // edit user view
      .when('/admin/users/:user/edit', {
         templateUrl: 'views/admin/forms/user-edit.html',
         resolve: {
            permission: function (SecFactory) {
               SecFactory.setPermission('admin');
            }
         }
      })
      // images admin view
      .when('/admin/images', {
         templateUrl: 'views/admin/images-admin.html',
         resolve: {
            permission: function (SecFactory) {
               SecFactory.setPermission('admin');
            }
         }
      })
      // submissions
      .when('/admin/submissions/', {
         templateUrl: 'views/admin/submission-admin.html',
         resolve: {
            permission: function (SecFactory) {
               SecFactory.setPermission('admin');
            }
         }
      })
      // submission view
      .when('/admin/submissions/:submission', {
         templateUrl: 'views/admin/submission-view.html',
         resolve: {
            permission: function (SecFactory) {
               SecFactory.setPermission('admin');
            }
         }
      })
      // submission view
      .when('/admin/submissions/:submission/comments', {
         templateUrl: 'views/admin/submission-comments.html',
         resolve: {
            permission: function (SecFactory) {
               SecFactory.setPermission('admin');
            }
         }
      })
      // email admin
      .when('/admin/email/', {
         templateUrl: 'views/admin/email-admin.html',
         resolve: {
            permission: function (SecFactory) {
               SecFactory.setPermission('admin');
            }
         }
      })
      // email view
      .when('/admin/email/:email', {
         templateUrl: 'views/admin/email-view.html',
         resolve: {
            permission: function (SecFactory) {
               SecFactory.setPermission('admin');
            }
         }
      });
   }]);