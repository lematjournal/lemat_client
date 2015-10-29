(function (angular) {

   'use strict';

   function SubmissionsVoteModalController($scope, $rootScope, $modalInstance, SubFactory, submission) {
      var vm = this;
      vm.submission = submission;
      vm.comment = {
         user_id: $rootScope.userId,
         submission_id: submission.id,
         body: ''
      };
      $scope.index = vm.submission.votes_array.length;
      vm.submission.votes_array[$scope.index] = {
         user_id: $rootScope.userId,
         vote: undefined
      };

      vm.incrementVotes = function (index) {
         if (vm.submissions[index].votes_array[$rootScope.userId - 1]) {
            vm.submissions[index].votes++;
         } else if (!vm.submissions[index].votes_array[$rootScope.userId - 1]) {
            vm.submissions[index].votes--;
         }
      };

      $scope.ok = function () {
         SubFactory.upsertComment(vm.comment);
         vm.submission.votes++;
         vm.submission.comments.push(vm.comment);
         $modalInstance.close(vm.submission);
      };

      $scope.cancel = function () {
         vm.submission = submission;
         $modalInstance.dismiss('cancel');
      };

      $scope.customMenu = [
            ['bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript'],
            ['remove-format'],
            ['ordered-list', 'unordered-list', 'outdent', 'indent'],
            ['code', 'quote', 'paragraph'],
            ['link']
        ];
   }

   angular.module('lematClient.admin.submissions')
      .controller('SubmissionModalController', SubmissionsVoteModalController);

   SubmissionsVoteModalController.$inject = ['$scope', '$rootScope', '$modalInstance', 'SubFactory', 'submission'];

})(angular);
