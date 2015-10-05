'use strict';

angular.module('lematClient').config(['$routeProvider', function ($routeProvider) {
   $routeProvider
      .when('/profile/', {
         templateUrl: 'views/client/user-view.html',
         controller: 'ProfileController',
         resolve: {
            permission: function (SecFactory) {
               SecFactory.setPermission('contributor');
               return SecFactory.getPermission();
            }
         }
      })
      .when('/profile/settings', {
         templateUrl: 'views/client/forms/user-settings.html',
         controller: 'ProfileController',
         resolve: {
            permission: function (SecFactory) {
               SecFactory.setPermission('contributor');
               return SecFactory.getPermission();
            }
         }
      })
      .when('/profile/:user/pieces', {
         templateUrl: 'views/client/forms/pieces-list.html',
         controller: 'ProfileController',
         resolve: {
            permission: function (SecFactory) {
               SecFactory.setPermission('contributor');
               return SecFactory.getPermission();
            }
         }
      })
      .when('/prfile/:user/pieces/:piece', {
         templateUrl: 'views/client/forms/post-view.html',
         controller: 'ProfileController',
         resolve: {
            permission: function (SecFactory) {
               SecFactory.setPermission('contributor');
               return SecFactory.getPermission();
            }
         }
      })
      .when('/profile/:user/posts/:post/edit', {
         templateUrl: 'views/client/forms/post-edit.html',
         controller: 'ProfileController',
         resolve: {
            permission: function (SecFactory) {
               SecFactory.setPermission('contributor');
               return SecFactory.getPermission();
            }
         }
      })
      .when('/profle/:user/posts/create', {
         templateUrl: 'views/client/forms/post-create.html',
         controller: 'ProfileController',
         resolve: {
            permission: function (SecFactory) {
               SecFactory.setPermission('contributor');
               return SecFactory.getPermission();
            }
         }
      });
}]);