'use strict';

angular.module('lematClient.admin.submissions')
   .factory('SubFactory', ['$http', 'ServerUrl', function ($http, ServerUrl) {

      var comment = {},
        newSubmissions = {},
        records = [],
         submissions = [],
         submission = {};

      var getSubmissions = function () {
         return $http.get(ServerUrl + '/submissions/').then(function (response) {
            var modifiedResponse = setDates(response.data);
            angular.copy(modifiedResponse, submissions);
         });
      };

      var getSubmission = function (uid) {
         return $http.get(ServerUrl + '/submissions/' + uid).then(function (response) {
            angular.copy(response.data, submission);
         });
      };
      
      var getNewSubmissions = function () {
         return $http.get(ServerUrl + '/submissions/new-submissions').then(function (response) {
            angular.copy(response.data, newSubmissions);
         });
      };

      var upsertSubmission = function (submission) {
         console.log(submission);
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
               user_ids: submission.user_ids
            }
         };

         return $http.patch(ServerUrl + '/submissions/' + submission.id, params).then(function (response) {
            angular.copy(response.data, submission);
         });
      };

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
      };
      
      var getRounds = function () {
         return $http.get(ServerUrl + '/submissions/rounds').then(function (response) {
            angular.copy(response.data, records);  
         });
      };


      return {
         upsertComment: upsertComment,
         upsertSubmission: upsertSubmission,
         getSubmissions: getSubmissions,
         getSubmission: getSubmission,
         getRounds: getRounds,
         submissions: submissions,
         submission: submission,
         records: records,
         updateVotes: updateVotes
      };
}]);