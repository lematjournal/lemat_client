(function (angular) {

   'use strict';

   function lematFooter(UserFactory) {
      var directive = {
         restrict: 'E',
         templateUrl: 'views/core/partials/footer.html',
         scope: false,
         link: link
      };

      return directive;

      function link(scope) {
         UserFactory.getPostUsers().then(function () {
            scope.postUsers = UserFactory.postUsers;
         });
         UserFactory.getIssueUsers().then(function () {
            scope.issueUsers = UserFactory.issueUsers;
         });
      }
   }

   angular.module('lematClient.directives')
      .directive('lematFooter', lematFooter);

   lematFooter.$inject = ['UserFactory'];

})(angular);