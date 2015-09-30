'use strict';

angular.module('lematClient').controller('MainController', ['$scope', '$rootScope', '$document', '$location', '$route', '$routeParams', '$http', 'AuthFactory', function ($scope, $rootScope, $document, $location, $route, $routeParams, $http, AuthFactory) {
   
   $scope.url = $location.absUrl();
   
   console.log($scope.url);

   $scope.isAuthenticated = function () {
      return AuthFactory.isAuthenticated();
   };

   $scope.logout = function () {
      AuthFactory.logout();
   };

   $scope.$on('scroll', function (event, data) {
      $scope.title = data;
   });

   $scope.$on('$locationChangeStart', function () {
      if ($location.url() !== '/issue/:id') {
         $scope.title = '';
      }
   });

   $scope.$watch(function () {
      return $location.url() === '/issue-admin';
   }, function (val) {
      if (val === true && !AuthFactory.isAuthenticated()) {
         $location.path('/');
      }
   });

   $scope.$watch(function () {
      return $location.url() === '/piece-create';
   }, function (val) {
      if (val === true && !AuthFactory.isAuthenticated()) {
         $location.path('/');
      }
   });

   $scope.$watch(function () {
      return $location.url() === '/issue/:id/edit';
   }, function (val) {
      if (val === true && !AuthFactory.isAuthenticated()) {
         $location.path('/');
      }
   });

   $scope.$watch(function () {
      return $location.url() === '/issue/:id/:piece/edit';
   }, function (val) {
      if (val === true && !AuthFactory.isAuthenticated()) {
         $location.path('/');
      }
   });

   $scope.$watch(function () {
      return $location.url() === '/:post/edit';
   }, function (val) {
      if (val === true && !AuthFactory.isAuthenticated()) {
         $location.path('/');
      }
   });

   $scope.$watch(function () {
      return $location.url() === '/create-post';
   }, function (val) {
      if (val === true && !AuthFactory.isAuthenticated()) {
         $location.path('/');
      }
   });

   $scope.$watch(function () {
      return $location.url() === '/online-admin';
   }, function (val) {
      if (val === true && !AuthFactory.isAuthenticated()) {
         $location.path('/');
      }
   });

   $scope.$watch(function () {
      return $location.url() === '/entry-admin';
   }, function (val) {
      if (val === true && !AuthFactory.isAuthenticated()) {
         $location.path('/');
      }
   });

   $scope.$watch(function () {
      return $location.url() === '/entry-create';
   }, function (val) {
      if (val === true && !AuthFactory.isAuthenticated()) {
         $location.path('/');
      }
   });

   $scope.$watch(function () {
      return $location.url() === '/entry-create';
   }, function (val) {
      if (val === true && !AuthFactory.isAuthenticated()) {
         $location.path('/');
      }
   });

   $scope.$watch(function () {
      return $location.url() === '/control-panel';
   }, function (val) {
      if (val === true && !AuthFactory.isAuthenticated()) {
         $location.path('/');
      }
   });

   $scope.scrollShow = function () {
      return $location.url() === '/issue/1';
   };

   // determines content of response modal

   $scope.isLoading = function () {
      return $http.pendingRequests.length > 0;
   };

   // emitter for filters

   $scope.filters = {};

   $scope.setFilter = function (filter) {
      $scope.filters.tags = filter;
      $location.path('/online');
      $scope.$emit('filter', $scope.filters);
   };

  }]);