(function (angular) {

   'use strict';

   function EntryFactory($http, $window, AuthFactory, ServerUrl, Slug) {
      var entry = {},
         entries = [];

      function resetEntry() {
         angular.copy({}, entry);
      }

      function getEntries() {
         return $http.get(ServerUrl + '/news/entries/').then(function (response) {
            angular.copy(response.data, entries);
         });
      }

      function getEntry(id) {
         return $http.get(ServerUrl + '/news/entries/' + id).then(function (response) {
            angular.copy(response.data, entry);
         });
      }

      function upsertEntry(entry) {         
//         var params = {
//            entry: {
//               title: entry.title,
//               content: entry.content,
//               user_id: entry.user_id,
//               image_url: entry.image_url,
//               title_url: Slug.slugify(entry.title),
//               preview: 
//            }
//         }
         
         var string = strip(entry.content).trim();
         console.log(string);
         string = intelligentlyTruncate(string, 100);
         console.log(string);
                  
         if (entry.id) {
            return $http.patch(ServerUrl + '/news/entries/' + entry.id, params).then(function (response) {
               console.log("response: ", response);
            }, function (response) {
               console.log(response);
            });
         } else {
            return $http.post(ServerUrl + '/news/entries/', params).then(function (response) {
               console.log("response: ", response);
               getEntry(response.data.id);
            }, function (response) {
               console.log("response: ", response);
            });
         }
      }
      
      function strip(html) {
         var tmp = document.createElement("DIV");
         tmp.innerHTML = html;
         return tmp.textContent || tmp.innerText || "";
      }
      
      function intelligentlyTruncate(text, threshhold) {    
         for(var i = threshhold; i < text.length; i++) {
            if( /^\s/.test(text.substr( i, 1 ) ) )
               return text.substr( 0, i ); // + '...' if you want the elipsis.
         }
         return text;
      }

      function deleteEntry(id) {
         return $http.delete(ServerUrl + '/news/entries/' + id).then(function () {
            entries.splice(findEntryIndexById(id), 1);
         });
      }

      function findEntryIndexById(id) {
         for (var i = 0; i < entry.length; i++) {
            if (entry[i].id === id) {
               return i;
            }
         }
      }

      function generatePreview(content) {
         var str = content;
         var indices = [];
         for (var i = 0; i < str.length; i++) {
            if (str[i] === '</div>') {
               indices.push(i);
            }
         }
      }

      return {
         getEntries: getEntries,
         getEntry: getEntry,
         upsertEntry: upsertEntry,
         deleteEntry: deleteEntry,
         entry: entry,
         entries: entries
      };
      
   }

   angular.module('lematClient.common.factories')
      .factory('EntryFactory', EntryFactory);

   EntryFactory.$inject = ['$http', '$window', 'AuthFactory', 'ServerUrl', 'Slug'];

})(angular);