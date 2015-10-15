(function (angular) {

   'use strict';

   angular.module('lematClient.controllers.pieces')
      .controller('PieceAdminController', PieceAdminController);

   PieceAdminController.$inject = ['$scope', '$rootScope', '$route', '$routeParams', '$location', '$uibModal', 'AuthFactory', 'IssueFactory', 'PieceFactory'];

   function PieceAdminController($scope, $rootScope, $route, $routeParams, $location, $uibModal, AuthFactory, IssueFactory, PieceFactory) {

      $scope.piece = {
         users: []
      };

      $scope.getPiece = function () {
         PieceFactory.getPiece($routeParams.id, $routeParams.piece);
         $scope.piece = PieceFactory.piece;
      };

      // piece crud actions

      $scope.upsertPiece = function (piece) {
         if (AuthFactory.isAuthenticated()) {
            PieceFactory.upsertPiece(piece, $routeParams.id).then(function () {
               IssueFactory.getIssue($routeParams.id);
               //            $location.path('admin/issues/' + $routeParams.id);
               $scope.getPiece();
            });
         }
      };

      $scope.deletePiece = function () {
         if (AuthFactory.isAuthenticated()) {
            PieceFactory.deletePiece($scope.piece);
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