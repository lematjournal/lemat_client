(function (angular) {

   'use strict';

   function SubmissionsHeaderController($scope, $state) {
      var vm = this;
      
   }

   angular.module('lematClient.core.submissions')
      .controller('SubmissionsHeaderController', SubmissionsHeaderController);

   SubmissionsHeaderController.$inject = ['$scope', '$state'];

})(angular);