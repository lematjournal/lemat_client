import { Component, Inject } from 'ng-forward';
import 'reflect-metadata';

@Component({
  selector: 'lematHeader',
  templateUrl: './scripts/components/layout/header/header.html',
  controllerAs: 'headerCtrl'

})
@Inject('$state')
export default class Footer {
  constructor($state) {
    this.display = $state.current.name === 'entries';
    console.log($state.current.name === 'entries');
  }
}
