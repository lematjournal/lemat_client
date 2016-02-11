import { Component, Inject } from 'ng-forward';
import 'reflect-metadata';

@Component({
  selector: 'lematHeader',
  templateUrl: './scripts/components/layout/header/header.html',
  controllerAs: 'headerCtrl'

})
@Inject('$rootScope', '$state')
export default class Footer {
  constructor($rootScope, $state) {
    this.display = $state.current.name === 'entries';
    // console.log($state.current.name === 'entries');
    $rootScope.$on('$stateChangeStart', (event, to, params) => {
      // console.log(event, to, params);
      this.display = to.name === 'entries'
    });
  }
}
