export default class Refresh {
  /*@ngInject*/
  constructor($rootScope, $window) {
    var window = angular.element($window);
    window.on('beforeunload', (event) => {
      $rootScope.$broadcast('refresh');
    });
  }

  static init($rootScope, $window) {
    Refresh.instance = new Refresh($rootScope, $window);
    return Refresh.instance;
  }
}
