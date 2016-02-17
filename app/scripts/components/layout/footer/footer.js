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

@Inject('$rootScope', '$scope', '$state', UsersFactory)
export default class Footer {
  constructor($rootScope, $scope, $state, UsersFactory) {
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.$state = $state;
    this.UsersFactory = UsersFactory;
    this.contributors = UsersFactory.contributors;
  }

  async ngOnInit() {
    await this.UsersFactory.fetchContributors();
    this.$scope.$apply(() => {
      this.contributors = this.UsersFactory.contributors;
    });
  }

  toDevBlog() {
    this.$state.go('entries');
    this.$rootScope.$broadcast('entryTagFilter', 'test');
  }
}
