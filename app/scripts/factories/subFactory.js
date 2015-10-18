'use strict';

angular.module('lematClient.factories')
   .factory('SubFactory', ['$http', 'ServerUrl', function ($http, ServerUrl) {
   
   var comment = {}, submissions = [], submission = {};
   
   var getSubmissions = function () {
      return $http.get(ServerUrl + '/submissions/').then(function (response) {
         angular.copy(response.data, submissions);
      });
   };
   
   var getSubmission = function (id) {
      return $http.get(ServerUrl + '/submissions/' + id).then(function (response) {
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
      console.log("input: ", submission);
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
      getSubmissions: getSubmissions,
      getSubmission: getSubmission,
      submissions: submissions,
      submission: submission,
      updateVotes: updateVotes
   };
}]);