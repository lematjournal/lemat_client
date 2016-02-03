export default class Redirect {
  /*@ngInject*/
  constructor($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', (event, to, params) => {
      if (to.redirectTo) {
        event.preventDefault();
        $state.go(to.redirectTo, params);
      }
    });
  }

  static init($rootScope, $state) {
    Redirect.instance = new Redirect($rootScope, $state);
    return Redirect.instance;
  }
}
