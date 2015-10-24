(function (angular) {

   'use strict';

   angular.module('lematClient', ['lematClient.admin', 'lematClient.common', 'lematClient.core', 'lematClient.services', 'ui.router'])
      .config(['$locationProvider', function ($locationProvider) {
      $locationProvider.html5Mode({ enabled: false }).hashPrefix('!');
   }]);

   // shared components

   angular.module('lematClient.common.constants', []);

   angular.module('lematClient.common.directives', ['ngTouch', 'ui.bootstrap', 'duScroll', 'wysiwyg.module', 'angularUtils.directives.dirPagination', 'angularUtils.directives.dirDisqus', 'angucomplete-alt', 'ngTagsInput', 'validation.match', 'akoenig.deckgrid', 'bootstrapColumnsSameHeight', 'socialLinks', 'youtube-embed', 'slugifier']);

   angular.module('lematClient.common.factories', []);

   angular.module('lematClient.common.filters', ['angular.filter']);

   angular.module('lematClient.common', ['lematClient.common.constants', 'lematClient.common.directives', 'lematClient.common.factories', 'lematClient.common.filters']);
   
   // admin components
   
   angular.module('lematClient.admin', []);

   angular.module('lematClient.admin.entries', []);
   
   angular.module('lematClient.admin.images', []);
   
   angular.module('lematClient.admin.issues', []);
   
   angular.module('lematClient.admin.mail', []);
   
   angular.module('lematClient.admin.posts', []);
   
   angular.module('lematClient.admin.submissions', []);
   
   angular.module('lematClient.admin.users', []);
   
   angular.module('lematClient.admin', ['lematClient.admin.entries', 'lematClient.admin.images', 'lematClient.admin.issues', 'lematClient.admin.mail', 'lematClient.admin.posts', 'lematClient.admin.submissions', 'lematClient.admin.users']);

   // core components

   angular.module('lematClient.core', []);

   angular.module('lematClient.core.editors', []);

   angular.module('lematClient.core.entries', []);

   angular.module('lematClient.core.issues', []);

   angular.module('lematClient.core.layout.footer', []);

   angular.module('lematClient.core.layout.header', []);

   angular.module('lematClient.core.layout.nav', []);

   angular.module('lematClient.core.layout', ['lematClient.core.layout.header', 'lematClient.core.layout.footer', 'lematClient.core.layout.nav']);

   angular.module('lematClient.core.login', []);

   angular.module('lematClient.core.posts', []);

   angular.module('lematClient.core.profile', []);

   angular.module('lematClient.core', ['lematClient.core.editors', 'lematClient.core.entries', 'lematClient.core.issues', 'lematClient.core.layout', 'lematClient.core.login', 'lematClient.core.posts', 'lematClient.core.profile']);

   // angular services

   angular.module('lematClient.services', ['ngCookies', 'ngSanitize', 'ng.deviceDetector']);

})(angular);