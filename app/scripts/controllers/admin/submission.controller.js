(function (angular) {

   'use strict';

   angular.module('lematClient.controllers.admin')
      .controller('SubmissionController', SubmissionController);

   SubmissionController.$inject = ['$scope', '$filter', '$uibModal', '$rootScope', '$routeParams', 'SubFactory', 'UserFactory'];

   function SubmissionController($scope, $filter, $uibModal, $rootScope, $routeParams, SubFactory, UserFactory) {

      $scope.getEditors = function () {
         return UserFactory.getEditors().then(function () {
            $scope.editors = UserFactory.editors;
         });
      };

      $scope.getNumber = function (num) {
         return new Array(num);
      };

      $scope.getSubmissions = function () {
         SubFactory.getSubmissions().then(function () {
            $scope.submissions = SubFactory.submissions;
         });
      };

      $scope.getSubmission = function () {
         SubFactory.getSubmission($routeParams.submission).then(function () {
            $scope.submission = SubFactory.submission;
         });
      };

      $scope.incrementVotes = function (index) {
         if ($scope.submissions[index].votes_array[$rootScope.userId - 1]) {
            $scope.submissions[index].votes++;
         } else if (!$scope.submissions[index].votes_array[$rootScope.userId - 1]) {
            $scope.submissions[index].votes--;
         }
      };

      $scope.editors = function (elem) {
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
                  return $scope.submissions[submissionIndex];
               }
            }
         });

         $scope.$modalInstance.result.then(function (submission, comment) {
            $scope.submissions[submissionIndex] = submission;
            $scope.submissions[submissionIndex].comments.push(comment);
         });
      };
   }
   
})(angular)