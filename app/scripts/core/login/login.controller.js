(function (angular) {

   'use strict';

   function LoginController($scope, $rootScope, $location, AuthFactory) {
      var vm = this;
      
      $rootScope.session = AuthFactory.setUser();
      $rootScope.userId = AuthFactory.session.id;
      
      vm.postCredentials = function (credentials) {
         AuthFactory.login(credentials).then(function () {
            $rootScope.session = AuthFactory.setUser();
            $rootScope.userId = AuthFactory.session.id;
            $location.path('/');
         });
         toastr.success('Logged in', 'Done');
      };
      
   }

   angular.module('lematClient.core.login')
      .controller('LoginController', LoginController);

   LoginController.$inject = ['$scope', '$rootScope', '$location', 'AuthFactory'];

})(angular);