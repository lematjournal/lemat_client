(function (angular) {

   'use strict';

   function IssuesFactory($http, $window, ServerUrl) {
      var issues = [],
         issue = {},
         pieces = [];

      function resetIssue() {
         angular.copy({}, issue);
      }

      function getIssues() {
         return $http.get(ServerUrl + '/content/issues/').then(function (response) {
            angular.copy(response.data, issues);
         });
      }

      function getIssue(id) {
         return $http.get(ServerUrl + '/content/issues/' + id).then(function (response) {
            angular.copy(response.data, issue);
         });
      }

      function upsertIssue(issue) {
         var params = {
            issue: {
               title: issue.title,
               image_url: issue.image_url,
               download_link: issue.download_link
            }
         };

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
      }

      function findIssueIndexById(id) {
         for (var i = 0; i < issue.length; i++) {
            if (issues[i].id === id) {
               return i;
            }
         }
      }

      function deleteIssue(id, titleUrl) {
         return $http.delete(ServerUrl + '/content/issues/' + titleUrl).then(function () {
            issues.splice(findIssueIndexById(id), 1);
         });
      }

      function getIssuePieces(issueId) {
         return $http.get(ServerUrl + '/content/issues/' + issueId + '/pieces').then(function (response) {
            angular.copy(response.data, pieces);
         });
      }

      function uploadIssueImage(image) {
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
      }

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

   }

   angular.module('lematClient.common.factories')
      .factory('IssuesFactory', IssuesFactory);

   IssuesFactory.$inject = ['$http', '$window', 'ServerUrl'];

})(angular);