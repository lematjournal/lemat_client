(function (angular) {

   'use strict';

   function SubmissionsHeaderController($scope, $state) {
      var vm = this;
      
      $scope.valid = false;
      
      $scope.$on('validate', function (valid) {
         $scope.valid = valid;
      });
      
      $scope.go = $state.go.bind($state);
      
   }

   angular.module('lematClient.core.submissions')
      .controller('SubmissionsHeaderController', SubmissionsHeaderController);

   SubmissionsHeaderController.$inject = ['$scope', '$state'];

})(angular);