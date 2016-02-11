import { Component, Inject, Resolve } from 'ng-forward';
import IssuesFactory from './issues.factory';
import PiecesFactory from './pieces/pieces.factory';

@Component({
  selector: 'issues',
  controllerAs: 'issuesCtrl',
  providers: [IssuesFactory],
  templateUrl: './scripts/components/issues/issues.html'
})

@Inject('$scope', '$rootScope', IssuesFactory)
export default class IssuesComponent {
  @Resolve()
  @Inject(IssuesFactory)
  static resolve(IssuesFactory) {
    return IssuesFactory.getIssues();
  }

  constructor($scope, $rootScope, IssuesFactory) {
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.title = '';
    this.IssuesFactory = IssuesFactory;
    this.issue = IssuesFactory.issue;
    this.issues = IssuesFactory.issues;
  }
}
