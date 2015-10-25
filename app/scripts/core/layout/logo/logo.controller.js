(function (angular) {

   'use strict';

   function LogoController($scope, $timeout) {
      var vm = this;
      
//      $scope.hover = false;

//      $scope.$watch(function () {
//         return $scope.hover;
//      }, function (val) {
//         console.log(val);
//         if (val === true) {
//            $timeout(function () {
//               $scope.hover = false;
//            }, 5000);
//         }
//      });
      
   }

   angular.module('lematClient.core.layout.logo')
      .controller('LogoController', LogoController);

   LogoController.$inject = ['$scope', '$timeout'];

})(angular);