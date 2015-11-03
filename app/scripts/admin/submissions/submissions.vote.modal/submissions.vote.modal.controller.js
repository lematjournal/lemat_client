(function (angular) {

   'use strict';

   function SubmissionsVoteModalController($scope, $rootScope, $modalInstance, AuthFactory, SubFactory, submission) {
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
         if (vm.submissions[index].votes_array[vm.submissions[index].length]) {
            vm.submissions[index].votes++;
         } else if (!vm.submissions[index].votes_array[vm.submissions[index].length]) {
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
      .controller('SubmissionsVoteModalController', SubmissionsVoteModalController);

   SubmissionsVoteModalController.$inject = ['$scope', '$rootScope', '$modalInstance', 'AuthFactory', 'SubFactory', 'submission'];

})(angular);
