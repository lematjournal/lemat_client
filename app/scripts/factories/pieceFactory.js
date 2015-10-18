'use strict';

angular.module('lematClient.factories')
   .factory('PieceFactory', ['$http', '$window', 'AuthFactory', 'ServerUrl', function ($http, $window, AuthFactory, ServerUrl) {
   
   var piece = {};

   var getPiece = function (issueId, pieceTitle) {
      return $http.get(ServerUrl + '/content/issues/' + issueId + '/pieces/' + pieceTitle).then(function (response) {
         angular.copy(response.data, piece);
      });
   };

   var upsertPiece = function (piece, issueId) {
      var userIds = [];
      if (piece.users) {
         piece.users.map(function (object) {
            console.log(object);
            userIds.push(object.id);
         });
      }
      var params = {
         piece: {
            title: piece.title,
            content: piece.content,
            piece_type: piece.piece_type,
            user_ids: userIds,
            issue_id: issueId,
            order: piece.order,
            title_url: piece.title.replace(/\s/g, "-").substring(0, 25).toLowerCase()
         }
      };
      if (piece.id) {
         return $http.patch(ServerUrl + '/content/issues/' + piece.issue_id + '/pieces/' + piece.id, params).then(function (response) {
            pieces.push(response.data);
         }, function (response) {
            console.log(response);
         });
      } else {
         return $http.post(ServerUrl + '/content/issues/' + issueId + '/pieces/', params).then(function () {}, function (response) {
            console.log("error: ", response);
         });
      }
   };

   var deletePiece = function (piece) {
      return $http.delete(ServerUrl + '/content/issues/' + piece.issue_id + '/pieces/' + piece.id).then(function (response) {
         console.log("response: ", response);
      });
   };

   var findPieceIndexById = function (id) {
      for (var i = 0; i < issue.pieces.length; i++) {
         if (issue.pieces[i].id === id) {
            return i;
         }
      }
   };

   return {
      getPiece: getPiece,
      upsertPiece: upsertPiece,
      deletePiece: deletePiece,
      piece: piece
   };
}]);