import { UserModal } from '../../users/users.decorator';

@UserModal
export default class PiecesAdminController {
  /*@ngInject*/
  constructor($scope, $stateParams, AuthFactory, IssuesFactory, PiecesFactory) {
    this.$scope = $scope;
    this.$stateParams = $stateParams;
    this.AuthFactory = AuthFactory;
    this.IssuesFactory = IssuesFactory;
    this.PiecesFactory = PiecesFactory;
    this.piece = PiecesFactory.piece;
  }

    getPiece() {
      this.PiecesFactory.getPiece(this.$stateParams.id, this.$stateParams.piece);
      this.piece = this.PiecesFactory.piece;
    }

    // piece crud actions

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

    removeUser(id) {
      this.piece.users.splice(this.findUserIndexById(id), 1);
    }
  }
}
