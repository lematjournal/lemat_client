'use strict';

angular.module('lematClient.factories').factory('IssueFactory', ['$http', '$window', 'AuthFactory', 'ServerUrl', function ($http, $window, AuthFactory, ServerUrl) {
   var issues = [], issue = {}, pieces = [];

   var resetIssue = function () {
      angular.copy({}, issue);
   };

   var getIssues = function () {
      return $http.get(ServerUrl + '/content/issues/').then(function (response) {
         angular.copy(response.data, issues);
      });
   };

   var getIssue = function (id) {
      return $http.get(ServerUrl + '/content/issues/' + id).then(function (response) {
         angular.copy(response.data, issue);
      });
   };

   var upsertIssue = function (issue) {
      var params = {
         issue: {
            title: issue.title,
            image_url: issue.image_url,
            download_link: issue.download_link
         }
      };
      console.log(issue);
      
      if (issue.id) {
         return $http.patch(ServerUrl + '/content/issues/' + issue.id, params).then(function (response) {
            getIssue(response.data.id);
         }, function (response) {
            console.log(response);
         });
      } else {
         return $http.post(ServerUrl + '/content/issues/', params).then(function (response) {
            issues.push(response.data);
         }, function (response) {
            console.log("response: ", response);
         });
      }
   };

   var deleteIssue = function (id, titleUrl) {
      return $http.delete(ServerUrl + '/content/issues/' + titleUrl).then(function () {
         issues.splice(findIssueIndexById(id), 1);
      });
   };

   var findIssueIndexById = function (id) {
      for (var i = 0; i < issue.length; i++) {
         if (issues[i].id === id) {
            return i;
         }
      }
   };

   var getIssuePieces = function (issueId) {
      return $http.get(ServerUrl + '/content/issues/' + issueId + '/pieces').then(function (response) {
         angular.copy(response.data, pieces);
      });
   };
   
   var uploadIssueImage = function (image) {
      var params = {
         image: {
            image_url: image.imageUrl,
            user_id: image.userId,
            issue_id: image.issueId
         }
      };
      return $http.post(ServerUrl + '/content/images/', params).then(function (response) {
         angular.copy(response.data, image);
      }, function (response) {
         console.log("error: ", response);
      });
   };

   return {
      getIssues: getIssues,
      getIssue: getIssue,
      getIssuePieces: getIssuePieces,
      issues: issues,
      issue: issue,
      pieces: pieces,
      upsertIssue: upsertIssue,
      deleteIssue: deleteIssue,
      resetIssue: resetIssue,
      uploadIssueImage: uploadIssueImage

   };
}]);