'use strict';

angular.module('lematClient.core.routes').config(['$routeProvider', function ($routeProvider) {
   $routeProvider
      .when('/', {
         templateUrl: 'views/core/main.html',
      })
      .when('/entry/:entry', {
         templateUrl: 'views/core/entry-view.html',
      })
      .when('/issues/', {
         templateUrl: 'views/core/issue-list.html',
      })
      .when('/issues/:id', {
         templateUrl: 'views/core/issue.html',
      })
      .when('/issues/:id/:piece', {
         templateUrl: 'views/core/piece-view.html',
      })
      .when('/online', {
         templateUrl: 'views/core/online.html',
      })
      .when('/online/:post', {
         templateUrl: 'views/core/post-view.html',
      })
      .when('/user/:user', {
         templateUrl: 'views/core/user-view.html',
      })
      .when('/submissions', {
         templateUrl: 'views/core/submissions.html'
      })
      .when('/editors', {
         templateUrl: 'views/core/editors.html',
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