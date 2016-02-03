export default class Html5Mode {
  /*@ngInject*/
  constructor($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode({
      enabled: false
    }).hashPrefix('!');
  }

  static init($stateProvider, $urlRouterProvider, $locationProvider) {
    Html5Mode.instance = new Html5Mode($stateProvider, $urlRouterProvider, $locationProvider);
    return Html5Mode.instance;
  }
}
