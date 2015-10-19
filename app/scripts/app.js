'use strict';

angular.module('lematClient', ['lematClient.controllers', 'lematClient.constants', 'lematClient.directives', 'lematClient.factories', 'lematClient.filters', 'lematClient.routes', 'lematClient.services']).config(['$locationProvider', function ($locationProvider) {
      $locationProvider.html5Mode(false).hashPrefix('!');
}]);

angular.module('lematClient.controllers', ['lematClient.controllers.admin', 'lematClient.controllers.entries', 'lematClient.controllers.issues', 'lematClient.controllers.main', 'lematClient.controllers.pieces','lematClient.controllers.posts', 'lematClient.controllers.users']);

angular.module('lematClient.controllers.admin', []);

angular.module('lematClient.controllers.entries', []);

angular.module('lematClient.controllers.issues', []);

angular.module('lematClient.controllers.main', []);

angular.module('lematClient.controllers.pieces', []);

angular.module('lematClient.controllers.posts', []);

angular.module('lematClient.controllers.users', []);

angular.module('lematClient.constants', []);

angular.module('lematClient.directives', ['ngTouch', 'ui.bootstrap', 'duScroll', 'wysiwyg.module', 'angularUtils.directives.dirPagination', 'angularUtils.directives.dirDisqus', 'angucomplete-alt', 'ngTagsInput', 'validation.match', 'akoenig.deckgrid', 'bootstrapColumnsSameHeight', 'socialLinks', 'youtube-embed']);

angular.module('lematClient.factories', []);

angular.module('lematClient.filters', ['angular.filter']);

angular.module('lematClient.services', ['ngCookies', 'ngResource', 'ngSanitize', 'ng.deviceDetector']);

angular.module('lematClient.routes', ['lematClient.core.routes', 'lematClient.client.routes', 'lematClient.admin.routes']);

angular.module('lematClient.admin.routes', ['ngRoute']);

angular.module('lematClient.core.routes', ['ngRoute']);

angular.module('lematClient.client.routes', ['ngRoute']);