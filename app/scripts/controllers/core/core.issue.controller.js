'use strict';

angular.module('lematClient').controller('IssueController', ['$scope', '$rootScope', '$route', '$routeParams', '$location', '$document', '$http', '$modal', 'AuthFactory', 'AS3Factory', 'IssueFactory', function ($scope, $rootScope, $route, $routeParams, $location, $document, $http, $modal, AuthFactory, AS3Factory, IssueFactory) {
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

   $scope.getPiece = function () {
      IssueFactory.getIssuePiece($routeParams.id, $routeParams.piece);
      $scope.piece = IssueFactory.piece;
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
         if ($location.url() === '/piece-create') {
            IssueFactory.upsertIssuePiece(piece, piece.issue_id).then(function () {
               $location.path('/issue/' + $routeParams.id + '/edit');
               $scope.getPieces();
            });
         } else {
            IssueFactory.upsertIssuePiece(piece, $routeParams.id).then(function () {
               $scope.getIssue($routeParams.id);
               $location.path('/issue/' + $routeParams.id + '/edit');
               $scope.getPieces();
            });
         }
      }
   };

   $scope.deletePiece = function () {
      if (AuthFactory.isAuthenticated()) {
         IssueFactory.deleteIssuePiece($scope.piece);
         $location.path('issue/' + $routeParams.id);
         $scope.getIssue($routeParams.id);
      }
   };

   $scope.updatePieces = function () {
      angular.forEach($scope.issue.pieces, function (obj) {
         $scope.upsertPiece(obj);
      });
   };

   $scope.title = '';

   $scope.scrollToTop = function () {
      $document.scrollTopAnimated(0);
   };

   $scope.$watch(function () {
      return $scope.image;
   }, function (val) {
      if (val) {
         var image = {
            imageUrl: val,
            userId: $rootScope.userId,
            issueId: $scope.issue.id
         };
         AS3Factory.uploadImage(image).then(function (response) {
            console.log(response);
            if ($scope.issue) {
               $scope.issue.image = response;
            } else {
               $scope.issue = {};
               $scope.issue.image = response;
            }
         });
      }
   });

   // user create modal for pieces

   $scope.openUserModal = function () {
      $scope.$modalInstance = $modal.open({
         scope: $scope,
         templateUrl: 'views/modals/user-create.html',
         controller: 'UserController',
         size: 'lg'
      });
   };

   // methods for user select

   $scope.$on('selectedUser', function (event, data) {
      if (!!findUserIndexById(data.id)) {
         // do nothing
      } else {
         $scope.piece.users[$scope.piece.users.length] = {
            username: data.username,
            email: data.email,
            id: data.id
         };
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

   $scope.exclude = function (elem) {
      return elem.role.includes('contributor');
   };
         }]);