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
            vm.submission.attachments = vm.submission.attachments
            //            if (vm.submission.submission_type === 'text') {
            //               vm.convertDocxToHtml();
            //            } else if (vm.submission.submission_type === 'image') {
            //               vm.images = JSON.parse(vm.submission.attachments);
            //               console.log(vm.images);
            //            }
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
         var submission = {
            attachments: vm.submission.attachments,
            email_address: vm.submission.email_address,
            email_content: vm.submission.email_content,
            submission_type: vm.submission.submission_type,
            tag_names: vm.submission.tags,
            title: vm.submission.title,
            uid: vm.submission.uid,
            user: {
               username: vm.submission.username
            }
         };
         console.log(submission);
         console.log(vm.submission);
         SubFactory.upsertSubmission(submission)
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

      vm.convertDocxToHtml = function () {
         var deferred = $q.defer();
         var params = {
            submission: {
               document: $filter('filterDocs')(vm.submission.attachments)[0]
            }
         };
         $http.post(ServerUrl + '/submissions/render-doc', params).then(function (response) {
            vm.doc = response.data;
            toastr.success('You can edit your submission in the browser.', 'Preview Generated');
            deferred.resolve(vm.doc);
         }, function (errors) {
            console.log(errors);
            deferred.reject(errors);
            toastr.info('This happens when the file format contains irregular data, we\'re working on being able to generate previews in all cases.', 'Could not generate preview');
         });
         return deferred.promise;
      };

      function submissionModal(submissionIndex) {
         $scope.$uibModalInstance = $uibModal.open({
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

         $scope.$uibModalInstance.result.then(function (submission) {
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