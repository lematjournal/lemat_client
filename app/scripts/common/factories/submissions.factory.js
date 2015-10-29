'use strict';

angular.module('lematClient.admin.submissions')
   .factory('SubFactory', ['$http', 'ServerUrl', function ($http, ServerUrl) {

      var comment = {},
         submissions = [],
         submission = {};

      var getSubmissions = function () {
         return $http.get(ServerUrl + '/submissions/').then(function (response) {
            angular.copy(response.data, submissions);
         });
      };

      var getSubmission = function (uid) {
         return $http.get(ServerUrl + '/submissions/' + uid).then(function (response) {
            angular.copy(response.data, submission);
         });
      };

      var upsertSubmission = function (submission) {
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
         
         return $http.post(ServerUrl + '/submissions/', params).then(function (response) {
            angular.copy(response.data, submission);
         });
      };

      var upsertComment = function (commentHash) {
         var params = {
            comment: commentHash
         };
         return $http.post(ServerUrl + '/submissions/comments', params).then(function (response) {
            angular.copy(response.data, comment);
            console.log('comment: ', comment);
         });
      };

      var updateVotes = function (submission) {
         var params = {
            submission: {
               votes: submission.votes,
               votes_array: submission.votes_array,
            }
         };

         return $http.patch(ServerUrl + '/submissions/' + submission.id, params).then(function (response) {
            angular.copy(response.data, submission);
         });
      };

      return {
         upsertComment: upsertComment,
         upsertSubmission: upsertSubmission,
         getSubmissions: getSubmissions,
         getSubmission: getSubmission,
         submissions: submissions,
         submission: submission,
         updateVotes: updateVotes
      };
}]);