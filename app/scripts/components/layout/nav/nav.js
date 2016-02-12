import { Component, Inject } from 'ng-forward';
import AuthFactory from '../../../services/authentication.factory';
import 'angular-ui-bootstrap';
import 'reflect-metadata';

@Component({
  providers: ['ui.bootstrap.dropdown', AuthFactory],
  controllerAs: 'navCtrl',
  selector: 'lemat-nav',
  templateUrl: './scripts/components/layout/nav/nav.html'
})

@Inject('$scope', '$rootScope', '$state', '$http', AuthFactory)
export default class Nav {
  constructor($scope, $rootScope, $state, $http, AuthFactory) {
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$http = $http;
    this.AuthFactory = AuthFactory;

    $scope.$on('scroll', (event, data) => {
      $scope.title = data;
    });

    $scope.$on('$stateChangeStart', () => {
      if (!$state.is('issue') || !$state.is('issue-detail')) {
        $scope.title = '';
      }
    });

    $scope.toggled = (open) => {
      $scope.$broadcast('dropdownToggled', open);
    };

    $scope.scrollShow = () => {
      return $state.is('issue-detail');
    };

    $rootScope.filters = {};
  }

  isAuthenticated() {
    return this.AuthFactory.isAuthenticated();
  }

  logout() {
    try {
      this.AuthFactory.logout();
      this.$rootScope.session = {};
    } catch (error) {
      console.error(error);
    }
  }

  async getUserName() {
    try {
      this.$rootScope.userName = await this.AuthFactory.getUserName();
    } catch (error) {
      console.error(error);
    }
  }

  isAdmin() {
    return this.AuthFactory.isAdmin();
  }

  setFilter(filter) {
    this.$rootScope.filters.tags = filter;
    this.$state.go('posts');
  }
}
