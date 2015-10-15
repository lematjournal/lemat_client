'use strict';

angular.module('lematClient.client.routes').config(['$routeProvider', function ($routeProvider) {
   $routeProvider
      .when('/profile/', {
         templateUrl: 'views/client/user-view.html',
         controller: 'UserController',
         resolve: {
            permission: function (SecFactory) {
               SecFactory.setPermission('contributor');
            }
         }
      })
      .when('/profile/settings', {
         templateUrl: 'views/client/forms/user-settings.html',
         controller: 'UserController',
         resolve: {
            permission: function (SecFactory) {
               SecFactory.setPermission('contributor');
            }
         }
      })
      .when('/profile/:user/pieces', {
         templateUrl: 'views/client/forms/pieces-list.html',
         controller: 'UserController',
         resolve: {
            permission: function (SecFactory) {
               SecFactory.setPermission('contributor');
            }
         }
      })
      .when('/prfile/:user/pieces/:piece', {
         templateUrl: 'views/client/forms/post-view.html',
         controller: 'UserController',
         resolve: {
            permission: function (SecFactory) {
               SecFactory.setPermission('contributor');
            }
         }
      })
      .when('/profile/:user/posts/:post/edit', {
         templateUrl: 'views/client/forms/post-edit.html',
         controller: 'UserController',
         resolve: {
            permission: function (SecFactory) {
               SecFactory.setPermission('contributor');
            }
         }
      })
      .when('/profle/:user/posts/create', {
         templateUrl: 'views/client/forms/post-create.html',
         controller: 'UserController',
         resolve: {
            permission: function (SecFactory) {
               SecFactory.setPermission('contributor');
            }
         }
      });
}]);