'use strict';

angular.module('lematClient').factory('EntryFactory', ['$http', '$window', 'AuthFactory', 'ServerUrl', function ($http, $window, AuthFactory, ServerUrl) {
   var entry = {}, entries = [];

   var resetEntry = function () {
      angular.copy({}, entry);
   };

   var getEntries = function () {
      return $http.get(ServerUrl + '/entries/').then(function (response) {
         angular.copy(response.data, entries);
      });
   };

   var getEntry = function (id) {
      return $http.get(ServerUrl + '/entries/' + id).then(function (response) {
         angular.copy(response.data, entry);
      });
   };

   var upsertEntry = function (entry) {
      console.log(entry);
      var params = {
         entry: {
            title: entry.title,
            content: entry.content,
            user_id: entry.user_id
         }
      };

      if (entry.id) {
         return $http.patch(ServerUrl + '/entries/' + entry.id, params).then(function (response) {
            console.log("response: ", response);
            getEntry(response.data.id);
         }, function (response) {
            console.log(response);
         });
      } else {
         return $http.post(ServerUrl + '/entries/', params).then(function (response) {
            console.log("response: ", response);
            getEntry(response.data.id);
         }, function (response) {
            console.log("response: ", response);
         });
      }
   };

   var deleteEntry = function (id) {
      return $http.delete(ServerUrl + '/entries/' + id).then(function () {
         entry.splice(findEntryIndexById(id), 1);
      });
   };

   var findEntryIndexById = function (id) {
      for (var i = 0; i < entry.length; i++) {
         if (entry[i].id === id) {
            return i;
         }
      }
   };

   return {
      getEntries: getEntries,
      getEntry: getEntry,
      upsertEntry: upsertEntry,
      deleteEntry: deleteEntry,
      entry: entry,
      entries: entries
   };
}]);