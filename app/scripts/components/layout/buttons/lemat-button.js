import { AsModule, Component, View } from 'a1atscript';

@AsModule('lematClient.layout.lematButton')
@Component({
  selector: 'lemat-button',
  transclude: true,
  properties: {
    style: 'style'
  }
})
@View({
  templateUrl: './scripts/components/layout/buttons/lemat-button.html'
})
export default class LematButton {
  constructor() {}
}
