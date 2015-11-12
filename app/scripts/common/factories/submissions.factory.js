(function (angular) {

   'use strict';

   function SubFactory($http, ServerUrl) {
      var acceptedSubmissions = [],
         comment = {},
         currentSubmissions = [],
         pendingSubmissions = [],
         rounds = [],
         submissions = [],
         submission = {};
      
      
      function getAcceptedSubmissions() {
         return $http.get(ServerUrl + '/voting/accepted').then(function (response) {
            angular.copy(response.data, acceptedSubmissions);
         }); 
      }

      /**
       * Returns submissions currently under vote.
       * Assigns the time remaining the voting round
       * @returns {Array} Array of submissions currently under vote
       */
      function getCurrentRoundSubmissions() {
         return $http.get(ServerUrl + '/voting/current').then(function (response) {
            var modifiedResponse = setDates(response.data);
            angular.copy(modifiedResponse, currentSubmissions);
         });
      }

      function getPendingSubmisions() {
         return $http.get(ServerUrl + '/voting/pending').then(function (response) {
            angular.copy(response.data, pendingSubmissions);
         });
      }

      function getSubmissions() {
         return $http.get(ServerUrl + '/submissions/').then(function (response) {
            angular.copy(response.data, submissions);
         });
      }

      function getSubmission(uid) {
         return $http.get(ServerUrl + '/submissions/' + uid).then(function (response) {
            angular.copy(response.data, submission);
         });
      }

      function upsertSubmission(submission) {
         var params = {
            submission: {
               attachments: submission.attachments,
               email_address: submission.email_address,
               email_content: submission.email_content,
               submission_type: submission.submission_type,
               tag_names: submission.tags,
               title: submission.title,
               username: submission.user.username
            }
         };
         if (submission.uid) {
            return $http.patch(ServerUrl + '/submissions/' + submission.uid, params).then(function (response) {
               angular.copy(response.data, submission);
            });
         } else {
            return $http.post(ServerUrl + '/submissions/', params).then(function (response) {
               angular.copy(response.data, submission);
            });
         }
      }

      function upsertComment(commentHash) {
         var params = {
            comment: commentHash
         };
         return $http.post(ServerUrl + '/submissions/comments', params).then(function (response) {
            angular.copy(response.data, comment);
            console.log('comment: ', comment);
         });
      }

      function updateVotes(submission) {
         var params = {
            submission: {
               votes_array: submission.votes_array,
               user_ids: submission.user_ids
            }
         };

         return $http.patch(ServerUrl + '/voting/' + submission.uid, params).then(function (response) {
            angular.copy(response.data, submission);
         });
      }

      function setDates(responseData) {
         var newData = [];
         angular.forEach(responseData, function (obj) {
            var date = new Date(obj.end_date);
            var time = new Date();
            var timeRemaining = (date.valueOf() - time.getTime().valueOf());
            timeRemaining = timeRemaining.toString();
            timeRemaining = timeRemaining.substring(0, timeRemaining.length - 3);
            timeRemaining = parseInt(timeRemaining);
            obj.end_date = timeRemaining;
            newData.push(obj);
         });
         return newData;
      }

      function getRounds() {
         return $http.get(ServerUrl + '/voting/rounds').then(function (response) {
            angular.copy(response.data, rounds);
         });
      }

      function deleteSubmission(id) {
         return $http.delete(ServerUrl + '/submissions/' + id).then(function () {
            pendingSubmissions.splice(findSubmissionIndexById(id), 1);
         });
      }

      function findSubmissionIndexById(id) {
         for (var i = 0; i < pendingSubmissions.length; i++) {
            if (pendingSubmissions[i].id === id) {
               return i;
            }
         }
      }

      return {
         acceptedSubmissions: acceptedSubmissions,
         currentSubmissions: currentSubmissions,
         deleteSubmission: deleteSubmission,
         getAcceptedSubmissions: getAcceptedSubmissions,
         getCurrentRoundSubmissions: getCurrentRoundSubmissions,
         getPendingSubmissions: getPendingSubmisions,
         getSubmissions: getSubmissions,
         getSubmission: getSubmission,
         getRounds: getRounds,
         pendingSubmissions: pendingSubmissions,
         rounds: rounds,
         submissions: submissions,
         submission: submission,
         updateVotes: updateVotes,
         upsertComment: upsertComment,
         upsertSubmission: upsertSubmission,
      };
   }

   angular.module('lematClient.admin.submissions')
      .factory('SubFactory', SubFactory);

   SubFactory.$inject = ['$http', 'ServerUrl'];

})(angular);