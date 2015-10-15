(function (angular) {

   'use strict';

   angular.module('lematClient.controllers.admin')
      .controller('SubmissionController', SubmissionController);

   SubmissionController.$inject = ['$scope', '$filter', '$uibModal', '$rootScope', '$routeParams', 'SubFactory', 'UserFactory'];

   function SubmissionController($scope, $filter, $uibModal, $rootScope, $routeParams, SubFactory, UserFactory) {
      var vm = this;
      vm.getEditors = function () {
         return UserFactory.getEditors().then(function () {
            vm.editors = UserFactory.editors;
         });
      };

      vm.getNumber = function (num) {
         return new Array(num);
      };

      vm.getSubmissions = function () {
         SubFactory.getSubmissions().then(function () {
            vm.submissions = SubFactory.submissions;
         });
      };

      vm.getSubmission = function () {
         SubFactory.getSubmission($routeParams.submission).then(function () {
            vm.submission = SubFactory.submission;
         });
      };

      vm.incrementVotes = function (index) {
         if (vm.submissions[index].votes_array[$rootScope.userId - 1]) {
            vm.submissions[index].votes++;
         } else if (!vm.submissions[index].votes_array[$rootScope.userId - 1]) {
            vm.submissions[index].votes--;
         }
      };

      vm.editors = function (elem) {
         return elem.role.match(/^(admin|editor)$/);
      };

      $scope.open = function (submissionIndex) {
         $scope.$modalInstance = $uibModal.open({
            scope: $scope,
            templateUrl: 'views/admin/modals/submission-vote.html',
            size: 'lg',
            controller: 'VoteController',
            resolve: {
               submission: function () {
                  return vm.submissions[submissionIndex];
               }
            }
         });

         $scope.$modalInstance.result.then(function (submission, comment) {
            $scope.submissions[submissionIndex] = submission;
            $scope.submissions[submissionIndex].comments.push(comment);
         });
      };
   }
   
})(angular);