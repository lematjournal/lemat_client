(function (angular) {

   'use strict';

   function NavController($scope, $rootScope, $location,  $http, AuthFactory) {
      var vm = this;

      vm.url = $location.absUrl();

      vm.isAuthenticated = function () {
         return AuthFactory.isAuthenticated();
      };
      
      vm.logout = function () {
         AuthFactory.logout();
         $rootScope.session = {};
      };

      vm.getUserName = function () {
         $rootScope.userName = AuthFactory.getUserName();
      };

      vm.isAdmin = function () {
         return AuthFactory.isAdmin();
      };

      $scope.$on('scroll', function (event, data) {
         $scope.title = data;
      });

      $scope.$on('$locationChangeStart', function () {
         if ($location.url() !== '/issue/:id') {
            $scope.title = '';
         }
      });
      
      $scope.toggled = function (open) {
         $scope.$broadcast('dropdownToggled', open);
      };

      $scope.scrollShow = function () {
         return $location.url() === '/issue/1';
      };

      // emitter for filters

      $rootScope.filters = {};

      $rootScope.setFilter = function (filter) {
         $rootScope.filters.tags = filter;
         $location.path('/online');
      };
   }
   
   angular.module('lematClient.core.layout.header')
      .controller('NavController', NavController);

   NavController.$inject = ['$scope', '$rootScope', '$location', '$http', 'AuthFactory'];
   
})(angular);