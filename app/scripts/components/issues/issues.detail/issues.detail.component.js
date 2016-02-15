import { Component, Inject, Resolve } from 'ng-forward';
import IssuesComponent from '../issues.component';
import IssuesFactory from '../issues.factory';
import PiecesFactory from '../pieces/pieces.factory';
import ToTrusted from '../../../filters/to-trusted.filter';
import uiRouter from 'angular-ui-router';
import 'angular-filter';
import 'angular-scroll';

@Component({
  selector: 'issues-detail',
  controllerAs: 'issuesDetailCtrl',
  pipes: [ToTrusted],
  providers: ['angular.filter', 'duScroll', uiRouter, IssuesFactory],
  templateUrl: './scripts/components/issues/issues.detail/issues.detail.html'
})

@Inject('$document', '$scope', '$rootScope', IssuesFactory)
export default class IssuesDetailComponent extends IssuesComponent {
  @Resolve()
  @Inject('$stateParams', IssuesFactory)
  static resolve($stateParams, IssuesFactory) {
    if ($stateParams.issue !== IssuesFactory.issue.id) return IssuesFactory.get($stateParams.issue);
  }
  constructor($document, $scope, $rootScope, IssuesFactory) {
    super($scope, $rootScope, IssuesFactory)
    this.$document = $document;
  }

  scrollToTop() {
    this.$document.scrollTopAnimated(0);
  }
}
