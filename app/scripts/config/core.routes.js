'use strict';

angular.module('lematClient').config(['$routeProvider', function ($routeProvider) {
   $routeProvider
      .when('/', {
         templateUrl: 'views/core/main.html',
         controller: 'EntryController'
      })
      // list all issues
      .when('/issues/', {
         templateUrl: 'views/core/issue-list.html',
         controller: 'IssueController'
      })
      // issue view
      .when('/issue/:id', {
         templateUrl: 'views/core/issue.html',
         controller: 'IssueController'
      })
      // entry view
      .when('/entry/:entry', {
         templateUrl: 'views/core/entry-view.html',
         controller: 'EntryController'
      })
      // piece view
      .when('/issue/:id/:piece', {
         templateUrl: 'views/core/piece-view.html',
         controller: 'IssueController'
      })
      // view all posts
      .when('/online', {
         templateUrl: 'views/core/online.html',
         controller: 'PostController'
      })
      // post view
      .when('/online/:post', {
         templateUrl: 'views/core/post-view.html',
         controller: 'PostController'
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
      // authentication
      .when('/login', {
         templateUrl: 'views/core/login.html'
      })
      .otherwise({
         redirectTo: '/'
      });
}]);