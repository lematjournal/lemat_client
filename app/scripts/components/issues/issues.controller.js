export default class IssuesController {
  /*@ngInject*/
  constructor($scope, $rootScope, $stateParams, $document, IssuesFactory, PiecesFactory) {
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.$stateParams = $stateParams;
    this.$document = $document;
    this.title = '';
    this.IssuesFactory = IssuesFactory;
    this.PiecesFactory = PiecesFactory;
    this.issue = IssuesFactory.issue;
    this.issues = IssuesFactory.issues;
    this.piece = PiecesFactory.piece;
  }

  scrollToTop() {
    this.$document.scrollTopAnimated(0);
  }

  exclude(elem) {
    return elem.role.includes('contributor');
  }
}
