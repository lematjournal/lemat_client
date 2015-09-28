'use strict';

angular.module('lematClient').directive('scrollPosition', ['$document', function ($document) {
   return {
      scope: {
         scroll: '=scrollPosition'
      },
      link: function (scope, element, attrs) {
         var windowEl = angular.element($document);
         var handler = function () {
            scope.scroll = windowEl.scrollTop();
         };
         windowEl.on('scroll', scope.$apply.bind(scope, handler));
         handler();
      }
   };
}]);

angular.module('lematClient').directive('lematRepeat', [function () {
   return function (scope, element, attrs) {
      angular.element(element);
      if (scope.$last) {
         setTimeout(function () {
            scope.$emit('lastElem');
         }, 1);
      }
   };
}]);

angular.module('lematClient').directive('scroll', ['$document', function ($document) {
   return {
      scope: false,
      controller: 'IssueController',
      link: function (scope, element, attrs) {
         var posArray = [];

         // grabs selectors after dom is loaded

         scope.$on('lastElem', function (event) {
            angular.forEach(scope.issue.pieces, function (object) {
               var selector = "#" + object.title_url.toString();
               var el = document.querySelector(selector);
               var top = el.getBoundingClientRect().top;
               posArray.push({
                  title: object.title,
                  pos: (top)
               });
            });

            // makes sure order is preserved

            posArray.sort(function (a, b) {
               return parseFloat(a.pos - b.pos);
            });
         });

         var i = 0;

         $document.on('scroll', function () {
            try {
               if (scope.scroll < posArray[0]["pos"]) {
                  scope.title = '';
               }
            } catch (e) {
               // do nothing
            }

            try {
               if (scope.scroll > posArray[i]["pos"] && scope.scroll > posArray[0]["pos"]) {
                  scope.title = posArray[i]["title"];
               }
            } catch (e) {
               // do nothing
            }

            try {
               if (scope.scroll > posArray[i + 1]["pos"]) {
                  i++;
               }
            } catch (e) {
               // do nothing
            }

            try {
               if (scope.scroll < posArray[i]["pos"] && scope.scroll > posArray[0]["pos"]) {
                  i--;
               }
            } catch (e) {
               // do nothing
            }
            scope.$emit('scroll', scope.title.toUpperCase());

         });
      }
   };
}]);