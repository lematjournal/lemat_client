(function (angular) {
   
   'use strict';

   function PiecesFactory($http, $window, ServerUrl, Slug) {
      var piece = {};

      function getPiece(issueId, pieceTitle) {
         return $http.get(ServerUrl + '/content/issues/' + issueId + '/pieces/' + pieceTitle).then(function (response) {
            angular.copy(response.data, piece);
         });
      };

      function upsertPiece(piece, issueId) {
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
               title_url: Slug.slugify(piece.title)
            }
         };
         if (piece.id) {
            return $http.patch(ServerUrl + '/content/issues/' + piece.issue_id + '/pieces/' + piece.id, params).then(function (response) {
               pieces.push(response.data);
            }, function (response) {
               console.log(response);
            });
         } else {
            return $http.post(ServerUrl + '/content/issues/' + issueId + '/pieces/', params).then(function (response) {
               console.log("error: ", response);
            });
         }
      };

      function deletePiece(piece) {
         return $http.delete(ServerUrl + '/content/issues/' + piece.issue_id + '/pieces/' + piece.id).then(function (response) {
            console.log("response: ", response);
         });
      };

      return {
         getPiece: getPiece,
         upsertPiece: upsertPiece,
         deletePiece: deletePiece,
         piece: piece
      };
      
   }

   angular.module('lematClient.common.factories')
      .factory('PiecesFactory', PiecesFactory);

   PiecesFactory.$inject = ['$http', '$window', 'ServerUrl', 'Slug'];
   
})(angular);