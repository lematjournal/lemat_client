'use strict';

angular.module('lematClient.core.routes').config(['$routeProvider', function ($routeProvider) {
   $routeProvider
      .when('/', {
         templateUrl: 'views/core/main.html',
         controller: 'EntryClientController'
      })
      .when('/entry/:entry', {
         templateUrl: 'views/core/entry-view.html',
         controller: 'EntryClientController'
      })
      .when('/issues/', {
         templateUrl: 'views/core/issue-list.html',
         controller: 'IssueClientController'
      })
      .when('/issues/:id', {
         templateUrl: 'views/core/issue.html',
         controller: 'IssueClientController'
      })
      .when('/issues/:id/:piece', {
         templateUrl: 'views/core/piece-view.html',
         controller: 'PieceClientController'
      })
      .when('/online', {
         templateUrl: 'views/core/online.html',
         controller: 'PostClientController'
      })
      .when('/online/:post', {
         templateUrl: 'views/core/post-view.html',
         controller: 'PostClientController'
      })
      .when('/user/:user', {
         templateUrl: 'views/core/user-view.html',
         controller: 'UserController'
      })
      .when('/submissions', {
         templateUrl: 'views/core/submissions.html'
      })
      .when('/editors', {
         templateUrl: 'views/core/editors.html',
         controller: 'UserController'
      })
      .when('/about', {
         templateUrl: 'views/core/about.html'
      })
      .when('/login', {
         templateUrl: 'views/core/login.html'
      })
      .otherwise({
         redirectTo: '/'
      });
}]);