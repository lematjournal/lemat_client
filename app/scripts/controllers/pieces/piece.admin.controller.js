(function (angular) {

   'use strict';

   angular.module('lematClient.controllers.pieces')
      .controller('PieceAdminController', PieceAdminController);

   PieceAdminController.$inject = ['$scope', '$rootScope', '$route', '$routeParams', '$location', '$uibModal', 'AuthFactory', 'IssueFactory', 'PieceFactory'];

   function PieceAdminController($scope, $rootScope, $route, $routeParams, $location, $uibModal, AuthFactory, IssueFactory, PieceFactory) {
      var vm = this;

      vm.piece = {
         users: []
      };

      vm.getPiece = function () {
         PieceFactory.getPiece($routeParams.id, $routeParams.piece);
         vm.piece = PieceFactory.piece;
      };

      // piece crud actions

      vm.upsertPiece = function (piece) {
         if (AuthFactory.isAuthenticated()) {
            PieceFactory.upsertPiece(piece, $routeParams.id).then(function () {
               IssueFactory.getIssue($routeParams.id);
               //            $location.path('admin/issues/' + $routeParams.id);
               vm.getPiece();
            });
         }
      };

      vm.deletePiece = function () {
         if (AuthFactory.isAuthenticated()) {
            PieceFactory.deletePiece(vm.piece);
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
      };

      // user create modal for pieces

      $scope.openUserModal = function () {
         $scope.$modalInstance = $uibModal.open({
            scope: $scope,
            templateUrl: 'views/modals/user-create.html',
            controller: 'UserController',
            size: 'lg'
         });
      };
   }

})(angular);