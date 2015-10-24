(function (angular) {

   'use strict';

   function IssuesController($scope, $rootScope, $stateParams, $location, $document, $http, $uibModal, AuthFactory, AS3Factory, IssuesFactory, PiecesFactory) {
      var vm = this;

      vm.title = '';

      vm.scrollToTop = function () {
         $document.scrollTopAnimated(0);
      };

      vm.getIssues = function () {
         IssuesFactory.getIssues();
         vm.issues = IssuesFactory.issues;
      };

      vm.getIssue = function () {
         IssuesFactory.getIssue($stateParams.id).then(function () {
            vm.issue = IssuesFactory.issue;
         });
      };
      
      vm.getPiece = function () {
         PiecesFactory.getPiece($stateParams.id, $stateParams.piece).then(function () {
            vm.piece = PiecesFactory.piece;
         });
      };

      vm.exclude = function (elem) {
         return elem.role.includes('contributor');
      };
   }
     
   angular.module('lematClient.core.issues')
      .controller('IssuesController', IssuesController);
   
   IssuesController.$inject = ['$scope', '$rootScope', '$stateParams', '$location', '$document', '$http', '$uibModal', 'AuthFactory', 'AS3Factory', 'IssuesFactory', 'PiecesFactory'];

})(angular);