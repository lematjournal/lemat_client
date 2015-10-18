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

      vm.editors = function (elem) {
         return elem.role.match(/^(admin|editor)$/);
      };
      
      vm.submissionModal = submissionModal;
            
      vm.querySubmission = function (index, userId) {
         var disabled = undefined;
         // need to find a faster way to do this
         angular.forEach(vm.submissions[index].votes_array, function (obj) {
            if (obj.user_id === userId && obj.vote) {
               disabled = true;
            } else {
               disabled = false;
            }
         });
         return disabled;
      };

      function submissionModal(submissionIndex) {
         $scope.$modalInstance = $uibModal.open({
            templateUrl: 'views/admin/modals/submission-vote.html',
            controller: 'SubmissionModalController',
            controllerAs: 'vm',
            size: 'lg',
            resolve: {
               submission: function () {
                  return vm.submissions[submissionIndex];
               }
            }
         });

         $scope.$modalInstance.result.then(function (submission) {
            vm.submissions[submissionIndex] = submission;
            SubFactory.updateVotes(vm.submissions[submissionIndex]);
         });
      };
   }
   
})(angular);