(function (angular) {

   'use strict';

   function IssueClientController($scope, $rootScope, $route, $routeParams, $location, $document, $http, $uibModal, AuthFactory, AS3Factory, IssueFactory) {
      var vm = this;

      vm.title = '';

      vm.scrollToTop = function () {
         $document.scrollTopAnimated(0);
      };

      vm.getIssues = function () {
         IssueFactory.getIssues();
         vm.issues = IssueFactory.issues;
      };

      vm.getIssue = function () {
         IssueFactory.getIssue($routeParams.id);
         vm.issue = IssueFactory.issue;
      };

      vm.getPieces = function () {
         IssueFactory.getIssue($routeParams.id);
         $scope.pieces = IssueFactory.issue.pieces;
      };

      vm.exclude = function (elem) {
         return elem.role.includes('contributor');
      };
   }
     
   angular.module('lematClient.controllers.issues')
      .controller('IssueClientController', IssueClientController);
   
   IssueClientController.$inject = ['$scope', '$rootScope', '$route', '$routeParams', '$location', '$document', '$http', '$uibModal', 'AuthFactory', 'AS3Factory', 'IssueFactory'];

})(angular);