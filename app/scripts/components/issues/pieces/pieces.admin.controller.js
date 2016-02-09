import { Controller } from 'a1atscript';
import IssuesController from '../issues.controller';
import { UserModal } from '../../users/users.decorator';

@UserModal
@Controller('PiecesAdminController', ['$scope', '$stateParams', 'AuthFactory', 'IssuesFactory', 'PiecesFactory'])
export default class PiecesAdminController extends IssuesController {
  constructor($scope, $stateParams, AuthFactory, IssuesFactory, PiecesFactory) {
    super($scope, $rootScope, $stateParams, IssuesFactory, PiecesFactory);
    this.AuthFactory = AuthFactory;
  }

  deletePiece() {
    if (this.AuthFactory.isAuthenticated()) {
      this.PiecesFactory.deletePiece(this.piece);
    }
  }

  findUserIndexById(id) {
    for (let i = 0; i < this.piece.users.length; i += 1) {
      if (this.piece.users[i].id === id) {
        return this.piece.users[i];
      }
    }
  }

  getPiece() {
    this.PiecesFactory.getPiece(this.$stateParams.id, this.$stateParams.piece);
    this.piece = this.PiecesFactory.piece;
  }

  removeUser(id) {
    this.piece.users.splice(this.findUserIndexById(id), 1);
  }

  async upsertPiece(piece) {
    if (this.AuthFactory.isAuthenticated()) {
      try {
        this.PiecesFactory.upsertPiece(piece, this.$stateParams.id);
        await IssuesFactory.getIssue(this.$stateParams.id);
        await PiecesFactory.getPiece($stateParams.id, this.$stateParams.piece);
        this.piece = this.PiecesFactory.piece;
      } catch (error) {
        console.error(error);
      }
    }
  }
}
