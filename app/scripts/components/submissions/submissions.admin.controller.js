import { Component, Inject } from 'ng-forward';
import SubmissionsFactory from './submissions.factory';
import ServerUrl from '../../services/constants.module';

import 'reflect-metadata';
import 'angular-ui-router';

@Component({
  providers: ['ui.router', SubmissionsFactory]
})

@Inject('$scope', '$filter', '$rootScope', '$state', '$stateParams', '$window', SubmissionsFactory)
export default class SubmissionsAdminController {
  constructor($scope, $filter, $rootScope, $state, $stateParams, $window, SubmissionsFactory) {
    this.$scope = $scope;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.$window = $window;
  }
}
