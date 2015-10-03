'use strict';

angular.module('lematClient').directive('lematFooter', ['UserFactory', function (UserFactory) {
	return {
		restrict: 'E',
		templateUrl: 'views/partials/footer.html',
      scope: false,
      link: function (scope) {
         UserFactory.getPostUsers();
         scope.postUsers = UserFactory.postUsers;
         UserFactory.getIssueUsers();
         scope.issueUsers = UserFactory.issueUsers;
      }
	};
}]);