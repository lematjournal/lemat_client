import IssuesController from './issues.controller';
import { ImageModal } from '../images/images.decorator';
import 'babel-polyfill';

@ImageModal
export default class IssuesAdminController extends IssuesController {
  /*@ngInject*/
  constructor($scope, $rootScope, $stateParams, $document, $uibModal, AuthFactory, AS3Factory, IssuesFactory, ImagesFactory, PiecesFactory) {
    super($scope, $rootScope, $stateParams, $document, IssuesFactory, PiecesFactory);
    this.$uibModal = $uibModal;
    this.AuthFactory = AuthFactory;
    this.AS3Factory = AS3Factory;
    this.ImagesFactory = ImagesFactory;
  }

  deletePiece() {
    if (this.AuthFactory.isAuthenticated()) {
      this.PiecesFactory.deletePiece(this.piece);
    }
  }

  findPieceById(id) {
    for (var i = 0; i < this.issue.piece.length; i++) {
      if (this.issue.pieces[i].id === id) {
        return this.issue.pieces[i].id;
      }
    }
  }


  getIssue() {
    this.IssuesFactory.getIssue(this.$stateParams.issue).then(() => {
      this.issue = IssuesFactory.issue;
    });
  }

  deleteIssue(id) {
    if (this.AuthFactory.isAuthenticated()) {
      this.IssuesFactory.deletePost(id);
    }
  }

  imageModalCallback(issueImage) {
    this.issue.image_url = issueImage;
    this.upsertIssue(this.issue);
  }

  upsertIssue(issue) {
    if (this.AuthFactory.isAuthenticated()) {
      this.IssuesFactory.upsertIssue(issue);
      this.IssuesFactory.getIssues();
    }
  }

  async upsertPiece(piece) {
    if (this.AuthFactory.isAuthenticated()) {
      await this.PiecesFactory.upsertPiece(this.piece, this.$stateParams.id);
      this.getIssue(this.$stateParams.id);
    }
  };

  updatePieces() {
    this.issue.pieces.map((obj) => {
      this.upsertPiece(obj);
    });
  }

  uploadImage() {
    let image = {
      user_id: this.$rootScope.userId,
      image_url: this.issue.image_url
    };
    this.ImagesFactory.uploadImage(image);
  }
}
