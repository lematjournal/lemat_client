'use strict';

angular.module('lematClient', ['ngCookies', 'ngResource', 'ngRoute', 'ngSanitize', 'ngTouch', 'ui.bootstrap', 'ngAside', 'duScroll', 'angular.filter', 'wysiwyg.module', 'ng.deviceDetector', 'angularUtils.directives.dirPagination', 'angularUtils.directives.dirDisqus', 'validation.match', 'ui.bootstrap', 'angucomplete-alt', 'ngTagsInput', 'flow', 'bootstrapColumnsSameHeight', 'socialLinks', 'akoenig.deckgrid'])
   .value('duScrollDuration', 2000)
   .value('duScrollOffset', 30)
   .config(['flowFactoryProvider', '$routeProvider', '$locationProvider', function (flowFactoryProvider, $routeProvider, $locationProvider) {
      flowFactoryProvider.defaults = {
         target: '',
         permanentErrors: [404, 500, 501],
         maxChunkRetries: 1,
         chunkRetryInterval: 5000,
         simultaneousUploads: 4,
         singleFile: true
      };
      flowFactoryProvider.on('catchAll', function () {
         console.log('catchAll', arguments);
      });
      $locationProvider.html5Mode(false).hashPrefix('!');
 }]);