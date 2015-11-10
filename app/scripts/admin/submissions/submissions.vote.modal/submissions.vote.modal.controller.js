(function (angular) {

   'use strict';

   function SubmissionsVoteModalController($scope, $rootScope, $uibModalInstance, AuthFactory, SubFactory, submission) {
      var vm = this;
      
      AuthFactory.setUser();
      
      vm.userId = AuthFactory.session.id;
      
      vm.submission = submission;
      
      vm.comment = {
         user_id: vm.userId,
         submission_id: submission.id,
         body: ''
      };
      
      $scope.index = vm.submission.votes_array.length;
      
      vm.submission.votes_array[$scope.index] = {
         user_id: vm.userId,
         vote: undefined,
         weight: AuthFactory.session.weight
      };
      
      vm.incrementVotes = function (index) {
         if (vm.currentSubmissions[index].votes_array[vm.currentSubmissions[index].length]) {
            vm.currentSubmissions[index].votes.total_votes++;
         } else if (!vm.currentSubmissions[index].votes_array[vm.currentSubmissions[index].length]) {
            vm.currentSubmissions[index].votes.total_votes--;
         }
      };

      $scope.ok = function () {
         SubFactory.upsertComment(vm.comment);
         vm.submission.comments.push(vm.comment);
         $uibModalInstance.close(vm.submission);
         
      };

      $scope.cancel = function () {
         vm.submission = submission;
         $uibModalInstance.dismiss('cancel');
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
      .controller('SubmissionsVoteModalController', SubmissionsVoteModalController);

   SubmissionsVoteModalController.$inject = ['$scope', '$rootScope', '$uibModalInstance', 'AuthFactory', 'SubFactory', 'submission'];

})(angular);
