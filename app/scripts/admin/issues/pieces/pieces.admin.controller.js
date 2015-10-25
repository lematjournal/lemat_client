(function (angular) {

   'use strict';

   function PiecesAdminController($scope, $stateParams, $location, $uibModal, AuthFactory, IssuesFactory, PiecesFactory) {
      var vm = this;

      vm.piece = {
         users: []
      };

      vm.getPiece = function () {
         PiecesFactory.getPiece($stateParams.id, $stateParams.piece);
         vm.piece = PiecesFactory.piece;
      };

      // piece crud actions

      vm.upsertPiece = function (piece) {
         if (AuthFactory.isAuthenticated()) {
            PiecesFactory.upsertPiece(piece, $stateParams.id).then(function () {
               IssuesFactory.getIssue($stateParams.id);
               vm.getPiece();
            });
         }
      };

      vm.deletePiece = function () {
         if (AuthFactory.isAuthenticated()) {
            PiecesFactory.deletePiece(vm.piece);
         }
      };

      // methods for managing piece users

      vm.removeUser = function (id) {
         vm.piece.users.splice(findUserIndexById(id), 1);
      };

      function findUserIndexById(id) {
         for (var i = 0; i < vm.piece.users.length; i++) {
            if (vm.piece.users[i].id === id) {
               return vm.piece.users[i];
            }
         }
      }

      // user create modal for pieces

      $scope.openUserModal = function () {
         $scope.$modalInstance = $uibModal.open({
            scope: $scope,
            templateUrl: 'views/modals/user-create.html',
            controller: 'UsersController',
            size: 'lg'
         });
      };
   }
   
   angular.module('lematClient.admin.issues')
      .controller('PiecesAdminController', PiecesAdminController);

   PiecesAdminController.$inject = ['$scope', '$stateParams', '$location', '$uibModal', 'AuthFactory', 'IssuesFactory', 'PiecesFactory'];


})(angular);