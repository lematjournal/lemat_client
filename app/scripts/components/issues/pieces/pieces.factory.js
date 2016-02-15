import { Injectable, Inject } from 'ng-forward';
import ServerUrl from '../../../constants.module';
import slug from 'slug';
import 'babel-polyfill';

@Injectable()
@Inject('$http')
export default class PiecesFactory {
  constructor($http) {
    this.$http = $http;
    this.piece = {};
    this.pieces = [];
  }

  async delete(piece) {
    try {
      let response = this.$http.delete(ServerUrl + '/content/issues/' + piece.issue_id + '/pieces/' + piece.id);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  async get(issueId, pieceTitle) {
    try {
      let response = await this.$http.get(ServerUrl + '/content/issues/' + issueId + '/pieces/' + pieceTitle);
      angular.copy(response.data, this.piece);
    } catch (error) {
      console.error(error);
    }
  }

  async query() {
    try {
      let response = await this.$http.get(ServerUrl + '/content/issues/' + issueId + '/pieces/');
      angular.copy(response.data, this.pieces);
    } catch (error) {
      console.error(error);
    }
  }

  async upsert(piece, issueId) {
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
    try {
      if (piece.id) {
        let response = await this.$http.patch(ServerUrl + '/content/issues/' + piece.issue_id + '/pieces/' + piece.id, params)
        pieces.push(response.data);
      } else {
        let response = await this.$http.post(ServerUrl + '/content/issues/' + issueId + '/pieces/', params);
        pieces.push(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
