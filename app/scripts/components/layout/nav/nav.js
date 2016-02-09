import { AsModule, Component, View } from 'a1atscript';

@AsModule('lematClient.layout.nav')
@Component({
  appInjector: ['$scope', '$rootScope', '$location', '$http', 'AuthFactory'],
  controllerAs: 'navCtrl',
  selector: 'lemat-nav'
})
@View({
  templateUrl: './scripts/components/layout/nav/nav.html'
})
export default class Nav {
  constructor($scope, $rootScope, $location, $http, AuthFactory) {
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.$location = $location;
    this.$http = $http;
    this.AuthFactory = AuthFactory;

    $scope.$on('scroll', (event, data) => {
      $scope.title = data;
    });

    $scope.$on('$locationChangeStart', () => {
      if ($location.url() !== '/issue/:id') {
        $scope.title = '';
      }
    });

    $scope.toggled = (open) => {
      $scope.$broadcast('dropdownToggled', open);
    };

    $scope.scrollShow = () => {
      return $location.url() === '/issue/1';
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
    this.$location.path('/online');
  }
}
