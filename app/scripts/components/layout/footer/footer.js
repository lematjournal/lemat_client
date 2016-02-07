import { AsModule, Component, View } from 'a1atscript';

@AsModule('lematClient.layout.footer')
@Component({
  appInjector: ['$rootScope', '$state', '$localStorage', 'UsersFactory'],
  controllerAs: 'footerCtrl',
  selector: 'lematFooter'
})
@View({
  templateUrl: './scripts/components/layout/footer/footer.html'
})
export default class Footer {
  constructor($rootScope, $state, UsersFactory) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.UsersFactory = UsersFactory;
    this.issueUsers = UsersFactory.issueUsers;
    this.postUsers = UsersFactory.postUsers;
  }
}
