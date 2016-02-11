import { Component, Inject } from 'ng-forward';
import UsersFactory from '../../users/users.factory';
import 'reflect-metadata';

@Component({
  selector: 'lematFooter',
  providers: [UsersFactory],
  controllerAs: 'footerCtrl',
  templateUrl: './scripts/components/layout/footer/footer.html'

})
@Inject('$rootScope', '$state', UsersFactory)
export default class Footer {
  constructor($rootScope, $state, UsersFactory) {
    UsersFactory.fetchContributors();
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.UsersFactory = UsersFactory;
    this.contributors = UsersFactory.contributors;
  }
}
