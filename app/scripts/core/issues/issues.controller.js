export default class IssuesController {
  /*@ngInject*/
  constructor($scope, $rootScope, $stateParams, $document, $http, IssuesFactory, PiecesFactory) {
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.$stateParams = $stateParams;
    this.$document = $document;
    this.$http = $http;
    this.title = '';
    this.issue = IssuesFactory.issue;
    this.issues = IssuesFactory.issues;
    this.piece = PiecesFactory.piece;
  }

  scrollToTop() {
    this.$document.scrollTopAnimated(0);
  };

  exclude(elem) {
    return elem.role.includes('contributor');
  };
}
