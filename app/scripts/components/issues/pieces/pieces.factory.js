import { Injectable, Inject } from 'ng-forward';
import ServerUrl from '../../../constants.module';
import slug from 'slug';

@Injectable()
@Inject('$http')
export default class PiecesFactory {
  constructor($http) {
    this.$http = $http;
    this.piece = {};
    this.pieces = [];
  }

  get(issueId, pieceTitle) {
    return this.$http.get(ServerUrl + '/content/issues/' + issueId + '/pieces/' + pieceTitle).then((response) => {
      angular.copy(response.data, this.piece);
    });
  }

  upsert(piece, issueId) {
    let userIds = [];
    if (piece.users) {
      piece.users.map((object) => {
        console.log(object);
        userIds.push(object.id);
      });
    }
    let params = {
      piece: {
        title: piece.title,
        content: piece.content,
        piece_type: piece.piece_type,
        user_ids: userIds,
        issue_id: issueId,
        order: piece.order,
        title_url: slug(piece.title)
      }
    };
    if (piece.id) {
      return this.$http.patch(ServerUrl + '/content/issues/' + piece.issue_id + '/pieces/' + piece.id, params).then((response) => {
        pieces.push(response.data);
      }, (response) => {
        console.log(response);
      });
    } else {
      return this.$http.post(ServerUrl + '/content/issues/' + issueId + '/pieces/', params).then((response) => {
        console.log("error: ", response);
      });
    }
  }

  delete(piece) {
    return $http.delete(ServerUrl + '/content/issues/' + piece.issue_id + '/pieces/' + piece.id).then((response) => {
      console.log("response: ", response);
    });
  }
}
