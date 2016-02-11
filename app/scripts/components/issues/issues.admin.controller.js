import { Controller } from 'a1atscript';
import IssuesComponent from './issues.component';
import { ImageModal } from '../images/images.decorator';
import 'babel-polyfill';

@ImageModal
@Controller('IssuesAdminController', ['$scope', '$rootScope', '$stateParams', '$document', '$uibModal', 'AuthFactory', 'AS3Factory', 'IssuesFactory', 'ImagesFactory', 'PiecesFactory'])
export default class IssuesAdminController extends IssuesComponent {
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

  deleteIssue(id) {
    if (this.AuthFactory.isAuthenticated()) {
      this.IssuesFactory.deletePost(id);
    }
  }

  findPieceById(id) {
    for (let i = 0; i < this.issue.piece.length; i++) {
      if (this.issue.pieces[i].id === id) {
        return this.issue.pieces[i].id;
      }
    }
  }

  imageModalCallback(issueImage) {
    this.issue.image_url = issueImage;
    this.upsertIssue(this.issue);
  }

  async upsertIssue(issue) {
    if (this.AuthFactory.isAuthenticated()) {
      await this.IssuesFactory.upsertIssue(issue);
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
