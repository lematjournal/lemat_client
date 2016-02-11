import { Component, Inject } from 'ng-forward';
import UsersFactory from '../../users/users.factory';
import 'babel-polyfill';
import 'reflect-metadata';

@Component({
  selector: 'lematFooter',
  providers: [UsersFactory],
  controllerAs: 'footerCtrl',
  templateUrl: './scripts/components/layout/footer/footer.html'
})

@Inject('$scope', UsersFactory)
export default class Footer {
  constructor($scope, UsersFactory) {
    this.$scope = $scope;
    this.UsersFactory = UsersFactory;
    this.contributors = UsersFactory.contributors;
  }

  async ngOnInit() {
    await this.UsersFactory.fetchContributors();
    this.$scope.$apply(() => {
      this.contributors = this.UsersFactory.contributors;
    });
  }
}
