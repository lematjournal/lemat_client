export default class NavController {
  /*@ngInject*/
  constructor($scope, $rootScope, $location, $http, AuthFactory) {
    this.$rootScope = $rootScope;
    this.$location = $location;
    this.$http = $http;
    this.AuthFactory = AuthFactory;

    $scope.$on('scroll', (event, data) => {
      $scope.title = data;
    });

    $scope.$on('$locationChangeStart', () => {
      if (this.$location.url() !== '/issue/:id') {
        $scope.title = '';
      }
    });

    $scope.toggled = (open) => {
      $scope.$broadcast('dropdownToggled', open);
    };

    $scope.scrollShow = () => {
      return $location.url() === '/issue/1';
    };

    // emitter for filters

    $rootScope.filters = {};

    $rootScope.setFilter = function(filter) {
      $rootScope.filters.tags = filter;
      $location.path('/online');
    };
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
}
