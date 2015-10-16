(function (angular) {

   'use strict';

   angular.module('lematClient.controllers.issues')
      .controller('IssueAdminController', IssueAdminController);

   IssueAdminController.$inject = ['$scope', '$rootScope', '$route', '$routeParams', '$location', '$http', '$uibModal', 'AuthFactory', 'AS3Factory', 'IssueFactory', 'ImageFactory', 'PieceFactory'];

   function IssueAdminController($scope, $rootScope, $route, $routeParams, $location, $http, $uibModal, AuthFactory, AS3Factory, IssueFactory, ImageFactory, PieceFactory) {
      var vm = this;

      vm.image = {};

      vm.getIssues = function () {
         IssueFactory.getIssues();
         vm.issues = IssueFactory.issues;
      };

      vm.getIssue = function () {
         IssueFactory.getIssue($routeParams.id);
         vm.issue = IssueFactory.issue;
      };

      vm.getPieces = function () {
         IssueFactory.getIssue($routeParams.id);
         vm.pieces = IssueFactory.pieces;
      };

      // issue crud actions

      vm.upsertIssue = function (issue) {
         if (AuthFactory.isAuthenticated()) {
            IssueFactory.upsertIssue(issue);
            IssueFactory.getIssues();
         }
      };

      vm.deleteIssue = function (id, titleUrl) {
         if (AuthFactory.isAuthenticated()) {
            IssueFactory.deletePost(id, titleUrl);
         }
      };

      // piece crud actions

      vm.upsertPiece = function (piece) {
         if (AuthFactory.isAuthenticated()) {
            PieceFactory.upsertPiece(piece, $routeParams.id).then(function () {
               vm.getIssue($routeParams.id);
               vm.getPieces();
            });
         }
      };

      vm.deletePiece = function () {
         if (AuthFactory.isAuthenticated()) {
            PieceFactory.deletePiece($scope.piece);
            vm.getIssue($routeParams.id);
         }
      };

      vm.updatePieces = function () {
         angular.forEach($scope.issue.pieces, function (obj) {
            vm.upsertPiece(obj);
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
            controllerAs: 'vm',
            windowClass: 'app-modal-window',
            size: 'lg'
         });

         $scope.$modalInstance.result.then(function (issueImage) {
            vm.issue.image_url = issueImage;
            vm.upsertIssue(vm.issue);
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