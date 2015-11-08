(function (angular) {

   'use strict';

   function SubmissionsAdminController($scope, $http, $filter, $q, $uibModal, $rootScope, $stateParams, AuthFactory, SubFactory, PostsFactory, UsersFactory, ServerUrl) {
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

      vm.getSubmission = function () {
         SubFactory.getSubmission($stateParams.submission).then(function () {
            vm.submission = SubFactory.submission;
            vm.getAttachmentHtml();
         });
      };

      vm.getSubmissions = function () {
         SubFactory.getSubmissions().then(function () {
            vm.submissions = SubFactory.submissions;
         });
      };
      
      vm.getPendingSubmissions = function () {
         SubFactory.getPendingSubmissions().then(function () {
            vm.pendingSubmissions = SubFactory.pendingSubmissions;
         });
      };

      vm.getCurrentSubmissions = function () {
         SubFactory.getCurrentSubmissions().then(function () {
            vm.currentSubmissions = SubFactory.currentSubmissions;
            if (vm.currentSubmissions) {
               vm.querySubmissions(vm.currentSubmissions);
            }
         });
      };
      
      vm.upsertSubmission = function () {
         SubFactory.upsertSubmission(vm.submission);
      };

      vm.getTags = function () {
         PostsFactory.getTags().then(function () {
            vm.tags = PostsFactory.tags;
         });
      };
      
      vm.querySubmissions = function (submissions) {
         $scope.disabled = [];
         // need to find a faster way to do this
         for (var i = 0; submissions.length > i; i++) {
            for (var j = 0; submissions[i].votes_array.length > j; j++) {
               if (submissions[i].votes_array[j].user_id === vm.userId && submissions[i].votes_array[j].vote) {
                  $scope.disabled[i] = true;
               } else {
                  $scope.disabled[i] = false;
               }
            }
         }
      };
      
      vm.getAttachmentHtml = function () {
         var deferred = $q.defer();
         var link = {
            submission: {
               document: $filter('filterDocs')(vm.submission.attachments)[0]
            }
         };
         deferred.resolve($http.post(ServerUrl + '/submissions/render-doc', link).then(function (response) {
            vm.doc = response.data;
         }));
         return deferred.promise;
      };

      function submissionModal(submissionIndex) {
         $scope.$modalInstance = $uibModal.open({
            templateUrl: 'scripts/admin/submissions/submissions.vote.modal/submissions.vote.modal.html',
            controller: 'SubmissionsVoteModalController',
            controllerAs: 'submissionsVoteModalCtrl',
            size: 'lg',
            resolve: {
               submission: function () {
                  return vm.currentSubmissions[submissionIndex];
               }
            }
         });

         $scope.$modalInstance.result.then(function (submission) {
            vm.currentSubmissions[submissionIndex] = submission;
            SubFactory.updateVotes(vm.currentSubmissions[submissionIndex]);
            vm.querySubmissions(vm.currentSubmissions);
         });
      }

      vm.submissionModal = function (index) {
         if ($scope.disabled[index] === true) {
            // do nothing
         } else {
            submissionModal(index);
         }
      };
      
      vm.deleteSubmission = function (id) {
         SubFactory.deleteSubmission(id);
      };

   }

   angular.module('lematClient.admin.submissions')
      .controller('SubmissionsAdminController', SubmissionsAdminController);

   SubmissionsAdminController.$inject = ['$scope', '$http', '$filter', '$q', '$uibModal', '$rootScope', '$stateParams', 'AuthFactory', 'SubFactory', 'PostsFactory', 'UsersFactory', 'ServerUrl'];

})(angular);