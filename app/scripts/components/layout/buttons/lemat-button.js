import { Component, Input, Inject } from 'ng-forward';
import 'reflect-metadata';

@Component({
  selector: 'lemat-button',
  transclude: true,
  inputs: ['style'],
  templateUrl: './scripts/components/layout/buttons/lemat-button.html'
})
export default class LematButton {
  @Input() style;
  constructor() {}
}
