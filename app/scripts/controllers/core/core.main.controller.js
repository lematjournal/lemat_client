'use strict';

angular.module('lematClient').controller('MainController', ['$scope', '$rootScope', '$document', '$location', '$route', '$routeParams', '$http', 'AuthFactory', function ($scope, $rootScope, $document, $location, $route, $routeParams, $http, AuthFactory) {
   
   $scope.url = $location.absUrl();
   
   $scope.postCredentials = function (credentials) {
      AuthFactory.login(credentials).then(function () {
         $rootScope.session = AuthFactory.setUser();
         $rootScope.userId = AuthFactory.session.id;
         $location.path('/');
      });
      toastr.success('Logged in', 'Done');
   };
   
   $rootScope.session = AuthFactory.setUser();
   $rootScope.userId = AuthFactory.session.id;
   
   $scope.isAuthenticated = function () {
      return AuthFactory.isAuthenticated();
   };
      
   $scope.getUserName = function () {
      $rootScope.userName = AuthFactory.getUserName();
   };
   
   $scope.isAdmin = function () {
      return AuthFactory.isAdmin();
   };
         
   $scope.logout = function () {
      AuthFactory.logout();
      $rootScope.session = {};
   };

   $scope.$on('scroll', function (event, data) {
      $scope.title = data;
   });

   $scope.$on('$locationChangeStart', function () {
      if ($location.url() !== '/issue/:id') {
         $scope.title = '';
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