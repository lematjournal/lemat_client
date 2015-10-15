(function (angular) {

   'use strict';

   angular.module('lematClient.controllers.issues')
      .controller('IssueAdminController', IssueAdminController);

   IssueAdminController.$inject = ['$scope', '$rootScope', '$route', '$routeParams', '$location', '$http', '$uibModal', 'AuthFactory', 'AS3Factory', 'IssueFactory', 'ImageFactory', 'PieceFactory'];

   function IssueAdminController($scope, $rootScope, $route, $routeParams, $location, $http, $uibModal, AuthFactory, AS3Factory, IssueFactory, ImageFactory, PieceFactory) {

      $scope.image = {};

      $scope.getIssues = function () {
         IssueFactory.getIssues();
         $scope.issues = IssueFactory.issues;
      };

      $scope.getIssue = function () {
         IssueFactory.getIssue($routeParams.id);
         $scope.issue = IssueFactory.issue;
      };

      $scope.getPieces = function () {
         IssueFactory.getIssue($routeParams.id);
         $scope.pieces = IssueFactory.pieces;
      };

      // issue crud actions

      $scope.upsertIssue = function (issue) {
         if (AuthFactory.isAuthenticated()) {
            IssueFactory.upsertIssue(issue);
            IssueFactory.getIssues();
         }
      };

      $scope.deleteIssue = function (id, titleUrl) {
         if (AuthFactory.isAuthenticated()) {
            IssueFactory.deletePost(id, titleUrl);
         }
      };

      // piece crud actions

      $scope.upsertPiece = function (piece) {
         if (AuthFactory.isAuthenticated()) {
            PieceFactory.upsertPiece(piece, $routeParams.id).then(function () {
               $scope.getIssue($routeParams.id);
               $scope.getPieces();
            });
         }
      };

      $scope.deletePiece = function () {
         if (AuthFactory.isAuthenticated()) {
            PieceFactory.deletePiece($scope.piece);
            $scope.getIssue($routeParams.id);
         }
      };

      $scope.updatePieces = function () {
         angular.forEach($scope.issue.pieces, function (obj) {
            $scope.upsertPiece(obj);
         });
      };

      $scope.uploadImage = function () {
         var image = {
            user_id: $rootScope.userId,
            image_url: $scope.issue.image_url
         };
         ImageFactory.uploadImage(image);
      };

      $scope.openImageManager = function () {
         $scope.$modalInstance = $uibModal.open({
            scope: $scope,
            templateUrl: 'views/admin/modals/issue-image-upload.html',
            controller: 'IssueModalAdminController',
            windowClass: 'app-modal-window',
            size: 'lg'
         });

         $scope.$modalInstance.result.then(function (issueImage) {
            $scope.issue.image_url = issueImage;
            $scope.upsertIssue($scope.issue);
         });
      };

      // methods for user select

      $scope.$on('selectedUser', function (event, data) {
         if (!!findUserIndexById(data.id)) {
            // do nothing
         } else {
            $scope.piece.users.push(data);
         }
      });

      $scope.removeUser = function (id) {
         $scope.piece.users.splice(findUserIndexById(id), 1);
      };

      var findUserIndexById = function (id) {
         for (var i = 0; i < $scope.piece.users.length; i++) {
            if ($scope.piece.users[i].id === id) {
               return $scope.piece.users[i];
            }
         }
      };
   }
   
})(angular);