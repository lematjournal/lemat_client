'use strict';

angular.module('lematClient').config(['$routeProvider', function ($routeProvider) {
   $routeProvider
   // admin control panel
      .when('/admin', {
         templateUrl: 'views/admin/control-panel.html',
         resolve: {
            permission: function (SecFactory) {
               SecFactory.setPermission('admin');
               return SecFactory.getPermission();
            }
         }
      })
      // entry admin
      .when('/admin/entries', {
         templateUrl: 'views/admin/entry-admin.html',
         controller: 'EntryController',
         resolve: {
            permission: function (SecFactory) {
               SecFactory.setPermission('admin');
               return SecFactory.getPermission();
            }
         }
      })
      // create entry
      .when('/admin/entries/create', {
         templateUrl: 'views/admin/forms/entry-create.html',
         controller: 'EntryController',
         resolve: {
            permission: function (SecFactory) {
               SecFactory.setPermission('editor');
               return SecFactory.getPermission();
            }
         }
      })
      // entry edit
      .when('/admin/entries/:entry/edit', {
         templateUrl: 'views/admin/forms/entry-edit.html',
         controller: 'EntryController',
         resolve: {
            permission: function (SecFactory) {
               SecFactory.setPermission('admin');
               return SecFactory.getPermission();
            }
         }
      })
      // issue admin
      .when('/admin/issues', {
         templateUrl: 'views/admin/issue-admin.html',
         controller: 'IssueController',
         resolve: {
            permission: function (SecFactory) {
               SecFactory.setPermission('admin');
               return SecFactory.getPermission();
            }
         }
      })
      // edit issue
      .when('/admin/issues/:id/edit', {
         templateUrl: 'views/admin/forms/issue-edit.html',
         controller: 'IssueController',
         resolve: {
            permission: function (SecFactory) {
               SecFactory.setPermission('admin');
               return SecFactory.getPermission();
            }
         }
      })
      // piece view
      .when('/admin/issues/:id/:piece', {
         templateUrl: 'views/admin/piece-preview.html',
         controller: 'IssueController',
         resolve: {
            permission: function (SecFactory) {
               SecFactory.setPermission('admin');
               return SecFactory.getPermission();
            }
         }
      })
      // edit pieces attached to issue
      .when('/admin/issues/:id/:piece/edit', {
         templateUrl: 'views/admin/forms/piece-edit.html',
         controller: 'IssueController',
         resolve: {
            permission: function (SecFactory) {
               SecFactory.setPermission('admin');
               return SecFactory.getPermission();
            }
         }
      })
      // add pieces to issue
      .when('/admin/pieces/create', {
         templateUrl: 'views/admin/forms/piece-create.html',
         controller: 'IssueController',
         resolve: {
            permission: function (SecFactory) {
               SecFactory.setPermission('admin');
               return SecFactory.getPermission();
            }
         }
      })
      // admin for posts
      .when('/admin/posts', {
         templateUrl: 'views/admin/online-admin.html',
         controller: 'PostController',
         resolve: {
            permission: function (SecFactory) {
               SecFactory.setPermission('admin');
               return SecFactory.getPermission();
            }
         }
      })
      // create post view
      .when('/admin/posts/create', {
         templateUrl: 'views/admin/forms/post-create.html',
         controller: 'PostController',
         resolve: {
            permission: function (SecFactory) {
               SecFactory.setPermission('editor');
               return SecFactory.getPermission();
            }
         }
      })
      // edit post view
      .when('/admin/posts/:post/edit', {
         templateUrl: 'views/admin/forms/post-edit.html',
         controller: 'PostController',
         resolve: {
            permission: function (SecFactory) {
               SecFactory.setPermission('editor');
               return SecFactory.getPermission();
            }
         }
      })
      // user admin
      .when('/admin/users', {
         templateUrl: 'views/admin/user-admin.html',
         controller: 'UserController',
         resolve: {
            permission: function (SecFactory) {
               SecFactory.setPermission('admin');
               return SecFactory.getPermission();
            }
         }
      })
      // create user view
      .when('/admin/users/create', {
         templateUrl: 'views/admin/forms/user-create.html',
         controller: 'UserController',
         resolve: {
            permission: function (SecFactory) {
               SecFactory.setPermission('admin');
               return SecFactory.getPermission();
            }
         }
      })
      // edit user view
      .when('/admin/users/:user/edit', {
         templateUrl: 'views/admin/forms/user-edit.html',
         controller: 'UserController',
         resolve: {
            permission: function (SecFactory) {
               SecFactory.setPermission('admin');
               return SecFactory.getPermission();
            }
         }
      })
      // images admin view
      .when('/admin/images', {
         templateUrl: 'views/admin/images-admin.html',
         controller: 'ImageController',
         resolve: {
            permission: function (SecFactory) {
               SecFactory.setPermission('admin');
               return SecFactory.getPermission();
            }
         }
      });
   }]);