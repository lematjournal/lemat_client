(function (angular) {

   'use strict';

   function SubmissionsAdminController($scope, $filter, $uibModal, $rootScope, $stateParams, AuthFactory, SubFactory, UsersFactory) {
      var vm = this;
      
      AuthFactory.setUser();
            
      vm.userId = AuthFactory.session.id;
      
      vm.getEditors = function () {
         return UsersFactory.getEditors().then(function () {
            vm.editors = UsersFactory.editors;
         });
      };

      vm.getNumber = function (num) {
         return new Array(num);
      };

      vm.getSubmissions = function () {
         SubFactory.getSubmissions().then(function () {
            vm.submissions = SubFactory.submissions;
            if (vm.submissions) {
               vm.querySubmissions();
            }
         });
      };

      vm.getSubmission = function () {
         SubFactory.getSubmission($stateParams.submission).then(function () {
            vm.submission = SubFactory.submission;
         });
      };
      
      vm.getSubmissions();
      
      vm.getEditors();
                  
      vm.querySubmissions = function () {
         $scope.disabled = [];
         // need to find a faster way to do this
         for (var i = 0; vm.submissions.length > i; i++) {
            for (var j = 0; vm.submissions[i].votes_array.length > j; j++) {
               if (vm.submissions[i].votes_array[j].user_id === vm.userId && vm.submissions[i].votes_array[j].vote) {
                  $scope.disabled[i] = true;
               } else {
                  $scope.disabled[i] = false;
               }
            }
         }
      };
      
      vm.getNewSubmissions = function () {
        SubFactory.getNewSubmissions().then(function () {
           vm.newSubmissions = SubFactory.newSubmissions;
        }) 
      };
      
      vm.getOldSubmissions = function () {
        SubFactory.getOldSubmissions().then(function () {
           vm.oldSubmissions = SubFactory.oldSubmissions;
        }) 
      };

      function submissionModal(submissionIndex) {
         $scope.$modalInstance = $uibModal.open({
            templateUrl: 'scripts/admin/submissions/submissions.vote.modal/submissions.vote.modal.html',
            controller: 'SubmissionsVoteModalController',
            controllerAs: 'submissionsVoteModalCtrl',
            size: 'lg',
            resolve: {
               submission: function () {
                  return vm.submissions[submissionIndex];
               }
            }
         });

         $scope.$modalInstance.result.then(function (submission) {
            vm.submissions[submissionIndex] = submission;
            vm.submissions[submissionIndex].push(vm.userId);
            SubFactory.updateVotes(vm.submissions[submissionIndex]);
            vm.querySubmissions();
         });
      }
      
      vm.submissionModal = function (index) {
         if ($scope.disabled[index] === true) {
            // do nothing
         } else {
            submissionModal(index);
         }
      };
      
      vm.getRounds = function () {
         SubFactory.getRounds().then(function () {
            vm.rounds = SubFactory.rounds;
         })
      };
      
      vm.getRounds();
      vm.getOldSubmissions();
      vm.getNewSubmissions();
   
   }
   
   angular.module('lematClient.admin.submissions')
      .controller('SubmissionsAdminController', SubmissionsAdminController);

   SubmissionsAdminController.$inject = ['$scope', '$filter', '$uibModal', '$rootScope', '$stateParams', 'AuthFactory', 'SubFactory', 'UsersFactory'];
   
})(angular);