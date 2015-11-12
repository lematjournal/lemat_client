(function (angular) {

   'use strict';

   function UsersCreateModalController($scope, $rootScope, $uibModalInstance, UsersFactory) {
      var vm = this;

      $scope.ok = function () {
         UsersFactory.upsertUser(vm.user).then(function () {
            toastr.success('User created successfully', 'Done');
            vm.user = UsersFactory.user;
            console.log(vm.user);
            $uibModalInstance.close(vm.user);
         });
      };

      $scope.cancel = function () {
         $uibModalInstance.dismiss('cancel');
      };

   }

   angular.module('lematClient.admin.users')
      .controller('UsersCreateModalController', UsersCreateModalController);

   UsersCreateModalController.$inject = ['$scope', '$rootScope', '$uibModalInstance', 'UsersFactory'];

})(angular);