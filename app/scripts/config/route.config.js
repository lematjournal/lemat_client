class RouteConfig {
  constructor($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode({
      enabled: false
    }).hashPrefix('!');
    $urlRouterProvider.otherwise('/');
  }

  static init($stateProvider, $urlRouterProvider, $locationProvider) {
    RouteConfig.instance = new RouteConfig($stateProvider, $urlRouterProvider, $locationProvider);
    return RouteConfig.instance;
  }
}

export default angular.module('lematClient.config', []).config(RouteConfig.init);
