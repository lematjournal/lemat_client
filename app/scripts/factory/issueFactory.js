'use strict';

angular.module('lematClient').factory('IssueFactory', ['$http', '$window', 'AuthFactory', 'ServerUrl', function ($http, $window, AuthFactory, ServerUrl) {
   var issues = [], issue = {}, pieces = [], piece = {};

   var resetIssue = function () {
      angular.copy({}, issue);
   };

   var getIssues = function () {
      return $http.get(ServerUrl + '/issues/').then(function (response) {
         angular.copy(response.data, issues);
      });
   };

   var getIssue = function (id) {
      return $http.get(ServerUrl + '/issues/' + id).then(function (response) {
         angular.copy(response.data, issue);
         console.log(issue);
      });
   };

   var upsertIssue = function (issue) {
      var params = {
         issue: {
            title: issue.title,
            image: issue.image
         }
      }
      if (issue.id) {
         return $http.patch(ServerUrl + '/issues/' + issue.id, params).then(function (response) {
            getIssue(response.data.id);
         }, function (response) {
            console.log(response);
         });
      } else {
         return $http.post(ServerUrl + '/issues/', params).then(function (response) {
            issues.push(response.data);
         }, function (response) {
            console.log("response: ", response);
         });
      }
   };

   var deleteIssue = function (id, titleUrl) {
      return $http.delete(ServerUrl + '/issues/' + titleUrl).then(function (response) {
         issues.splice(findIssueIndexById(id), 1);
      });
   };

   var findIssueIndexById = function (id) {
      for (var i = 0; i < issue.length; i++) {
         if (issues[i].id === id) {
            return i;
         }
      }
   };

   var getIssuePieces = function (issueId) {
      return $http.get(ServerUrl + '/issues/' + issueId + '/pieces').then(function (response) {
         angular.copy(response.data, pieces);
      });
   };

   var getIssuePiece = function (issueId, pieceTitle) {
      return $http.get(ServerUrl + '/issues/' + issueId + '/pieces/' + pieceTitle).then(function (response) {
         angular.copy(response.data, piece);
      });
   };

   var upsertIssuePiece = function (piece, issueId) {
      var userIds = [];

      if (piece.users) {
         piece.users.map(function (object) {
            console.log(object);
            userIds.push(object.id);
         });
      }

      console.log(userIds);

      var params = {
         piece: {
            title: piece.title,
            content: piece.content,
            piece_type: piece.piece_type,
            user_ids: userIds,
            issue_id: piece.issue_id,
            order: piece.order,
            title_url: piece.title.replace(/\s/g, "-").substring(0, 25).toLowerCase()
         }
      }

      if (piece.id) {
         return $http.patch(ServerUrl + '/issues/' + issueId + '/pieces/' + piece.id, params).then(function (response) {
            pieces.push(response.data);
         }, function (response) {
            console.log(response);
         });
      } else {
         return $http.post(ServerUrl + '/issues/' + issueId + '/pieces/', params).then(function (response) {}, function (response) {
            console.log("response: ", response);
         });
      }
   };

   var deleteIssuePiece = function (piece) {
      console.log(piece);
      return $http.delete(ServerUrl + '/issues/' + piece.issue_id + '/pieces/' + piece.title).then(function (response) {});
   };

   var findIssuePieceIndexById = function (id) {
      for (var i = 0; i < issue.pieces.length; i++) {
         if (issue.pieces[i].id === id) {
            return i;
         }
      }
   };

   return {
      getIssues: getIssues,
      getIssue: getIssue,
      getIssuePieces: getIssuePieces,
      getIssuePiece: getIssuePiece,
      issues: issues,
      issue: issue,
      pieces: pieces,
      piece: piece,
      upsertIssue: upsertIssue,
      deleteIssue: deleteIssue,
      resetIssue: resetIssue,
      upsertIssuePiece: upsertIssuePiece,
      deleteIssuePiece: deleteIssuePiece
   };
}]);