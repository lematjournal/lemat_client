import { Component, Inject, Resolve } from 'ng-forward';
import PiecesFactory from './../pieces.factory';
import ToTrusted from '../../../../filters/to-trusted.filter';
import 'angular-filter';

@Component({
  selector: 'pieces-detail',
  controllerAs: 'piecesDetailCtrl',
  pipes: [ToTrusted],
  providers: [PiecesFactory],
  templateUrl: './scripts/components/issues/pieces/pieces.detail/pieces.detail.html'
})

@Inject(PiecesFactory)
export default class PiecesDetailComponent {
  @Resolve()
  @Inject('$stateParams', PiecesFactory)
  static resolve($stateParams, PiecesFactory) {
    return PiecesFactory.getPiece($stateParams.issue, $stateParams.piece);
  }
  constructor(PiecesFactory) {
    this.piece = PiecesFactory.piece;
  }
}
