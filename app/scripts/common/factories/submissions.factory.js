(function (angular) {

   'use strict';
                  
   function SubFactory($http, ServerUrl) {
      var comment = {},
         currentSubmissions = [],
         newSubmissions = [],
         pendingSubmissions = [],
         rounds = [],
         submissions = [],
         submission = {};

      function getCurrentSubmissions() {
         return $http.get(ServerUrl + '/voting/current-submissions').then(function (response) {
            var modifiedResponse = setDates(response.data);
            angular.copy(modifiedResponse, currentSubmissions);
            console.log(currentSubmissions);
         });
      }

      function getPendingSubmisions() {
         return $http.get(ServerUrl + '/voting/pending-submissions').then(function (response) {
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
         if (submission.id) {
            return $http.patch(ServerUrl + '/submissions/' + submission.id, params).then(function (response) {
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

         return $http.patch(ServerUrl + '/submissions/' + submission.id, params).then(function (response) {
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
            console.log(rounds);
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
         currentSubmissions: currentSubmissions,
         deleteSubmission: deleteSubmission,
         getCurrentSubmissions: getCurrentSubmissions,
         getPendingSubmissions: getPendingSubmisions,
         getSubmissions: getSubmissions,
         getSubmission: getSubmission,
         getRounds: getRounds,
         newSubmissions: newSubmissions,
         pendingSubmissions: pendingSubmissions,
         submissions: submissions,
         submission: submission,
         rounds: rounds,
         updateVotes: updateVotes,
         upsertComment: upsertComment,
         upsertSubmission: upsertSubmission,
      };
   }
      
   angular.module('lematClient.admin.submissions')
      .factory('SubFactory', SubFactory);
      
   SubFactory.$inject = ['$http', 'ServerUrl'];

})(angular);