import { Inject, Pipe } from 'ng-forward';

@Pipe()
@Inject('$sce')
export default class ToTrusted {
  constructor($sce) {
    this.$sce = $sce;
  }

  transform(text) {
    return this.$sce.trustAsHtml(text);
  }
}
