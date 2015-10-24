(function (angular) {

   'use strict';

   function scroll($document) {
      var directive = {
         scope: false,
         controller: 'IssuesController',
         controllerAs: 'vm',
         bindToController: true,
         link: link
      };
      
      return directive;

      function link(scope) {
         var posArray = [];

         // grabs selectors after dom is loaded
         

         scope.$on('lastElem', function () {
            angular.forEach(scope.vm.issue.pieces, function (object) {
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
               if (scope.scroll < posArray[0].pos) {
                  scope.title = '';
               }
            } catch (e) {
               // do nothing
            }

            try {
               if (scope.scroll > posArray[i].pos && scope.scroll > posArray[0].pos) {
                  scope.vm.title = posArray[i].title;
               }
            } catch (e) {
               // do nothing
            }

            try {
               if (scope.scroll > posArray[i + 1].pos) {
                  i++;
               }
            } catch (e) {
               // do nothing
            }

            try {
               if (scope.scroll < posArray[i].pos && scope.scroll > posArray[0].pos) {
                  i--;
               }
            } catch (e) {
               // do nothing
            }
            scope.$emit('scroll', scope.vm.title.toUpperCase());

         });
      }
   }
   
   angular.module('lematClient.common.directives')
      .directive('scroll', scroll);

   scroll.$inject = ['$document'];

})(angular);