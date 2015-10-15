'use strict';

angular.module('lematClient.factories').factory('SubFactory', ['$http', 'ServerUrl', function ($http, ServerUrl) {
   
   var submissions = [], submission = {};
   
   var getSubmissions = function () {
      return $http.get(ServerUrl + '/submissions/').then(function (response) {
         angular.copy(response.data, submissions);
         console.log(submissions);
      });
   };
   
   var getSubmission = function (id) {
      return $http.get(ServerUrl + '/submissions/' + id).then(function (response) {
         angular.copy(response.data, submission);
         console.log(submission);
      });
   };
   
   var updateVotes = function (submission) {
      var params = {
         id: submission.id,
         votes: submission.votes,
         votes_array: submission.votes_array
      };
      
      return $http.post(ServerUrl + '/submissions/' + submission.id, params).then(function (response) {
         angular.copy(response.data, submission);
      });
   };
   
   return {
      getSubmissions: getSubmissions,
      getSubmission: getSubmission,
      submissions: submissions,
      submission: submission
   };
}]);