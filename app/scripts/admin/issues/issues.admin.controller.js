(function (angular) {

   'use strict';

   function IssuesAdminController($scope, $rootScope, $stateParams, $location, $uibModal, AuthFactory, AS3Factory, IssuesFactory, ImagesFactory, PiecesFactory) {
      var vm = this;

      vm.image = {};

      vm.getIssues = function () {
         IssuesFactory.getIssues().then(function () {
            vm.issues = IssuesFactory.issues;
         });
      };

      vm.getIssue = function () {
         IssuesFactory.getIssue($stateParams.id).then(function () {
            vm.issue = IssuesFactory.issue;
         });
      };

      vm.getPieces = function () {
         IssuesFactory.getIssue($stateParams.id).then(function () {
            vm.pieces = IssuesFactory.pieces;
         });
      };

      // issue crud actions

      vm.upsertIssue = function (issue) {
         if (AuthFactory.isAuthenticated()) {
            IssuesFactory.upsertIssue(issue);
            IssuesFactory.getIssues();
         }
      };

      vm.deleteIssue = function (id) {
         if (AuthFactory.isAuthenticated()) {
            IssuesFactory.deletePost(id);
         }
      };

      // piece crud actions

      vm.upsertPiece = function (piece) {
         if (AuthFactory.isAuthenticated()) {
            PiecesFactory.upsertPiece(piece, $stateParams.id).then(function () {
               vm.getIssue($stateParams.id);
               vm.getPieces();
            });
         }
      };

      vm.deletePiece = function () {
         if (AuthFactory.isAuthenticated()) {
            PiecesFactory.deletePiece($scope.piece);
         }
      };
      
      function findPieceById(id) {
         for (var i = 0; i < vm.issue.piece.length; i++) {
            if (vm.issue.pieces[i].id === id) {
               return vm.issue.pieces[i].id;
            }
         }
      }

      vm.updatePieces = function () {
         angular.forEach($scope.issue.pieces, function (obj) {
            vm.upsertPiece(obj);
         });
      };

      $scope.uploadImage = function () {
         var image = {
            user_id: $rootScope.userId,
            image_url: vm.issue.image_url
         };
         ImagesFactory.uploadImage(image);
      };

      $scope.openImageManager = function () {
         $scope.$modalInstance = $uibModal.open({
            scope: $scope,
            templateUrl: 'views/admin/modals/issue-image-upload.html',
            controller: 'IssuesModalAdminController',
            controllerAs: 'vm',
            windowClass: 'app-modal-window',
            size: 'lg'
         });

         $scope.$modalInstance.result.then(function (issueImage) {
            vm.issue.image_url = issueImage;
            vm.upsertIssue(vm.issue);
         });
      };
      
   }
   
   angular.module('lematClient.admin.issues')
      .controller('IssuesAdminController', IssuesAdminController);

   IssuesAdminController.$inject = ['$scope', '$rootScope', '$stateParams', '$location', '$uibModal', 'AuthFactory', 'AS3Factory', 'IssuesFactory', 'ImagesFactory', 'PiecesFactory'];
   
})(angular);