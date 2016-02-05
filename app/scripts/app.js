import angular from 'angular';
import AuthFactory from './services/factories/authentication.factory';
import AdminRoutes from './routes/admin.routes';
import CoreRoutes from './routes/core.routes';
import * as config from './config';
import * as components from './components/components.module';
import * as filters from './services/filters.module';
import * as factories from './services/factories.module';
import * as directives from './services/directives.module';
import register from './utils/register';

import 'angucomplete-alt';
import 'angular-confirm';
import 'angular-deckgrid';
import 'angular-filter';
import 'angular-sanitize';
import 'angular-trix';
import 'angular-ui-bootstrap';
import 'angular-ui-router';
import 'angular-utils-pagination';
import 'angular-youtube-embed';
import 'ng-device-detector';
import 'ng-file-upload';
import 'ngstorage';
import 're-tree';

angular.module('lematClient.directives', ['akoenig.deckgrid', 'angularUtils.directives.dirPagination', 'ngFileUpload', 'ui.bootstrap.modal', 'youtube-embed']);
register('lematClient.directives').directive('lematRepeat', directives.lematRepeat);
register('lematClient.directives').directive('loading', directives.loading);
register('lematClient.directives').directive('ngEnter', directives.ngEnter);
register('lematClient.directives').directive('ngEsc', directives.ngEsc);
register('lematClient.directives').directive('uiSrefIf', directives.uiSrefIf);

angular.module('lematClient.services', ['ngSanitize', 'ng.deviceDetector', 'ngStorage']);
register('lematClient.services').service('AuthFactory', factories.AuthFactory);
register('lematClient.services').service('AS3Factory', factories.AS3Factory);
register('lematClient.services').service('PermissionFactory', factories.PermissionFactory);
register('lematClient.services').service('UsersFactory', factories.UsersFactory);

angular.module('lematClient', ['ui.router', 'lematClient.admin', 'lematClient.config', 'lematClient.core', 'lematClient.layout', 'lematClient.services'])
  .config(config.Html5Mode.init)
  .config(AdminRoutes.routeFactory)
  .config(CoreRoutes.routeFactory)
  // .config(function($provide) {
  //   $provide.decorator('$state', function($delegate) {
  //     var originalTransitionTo = $delegate.transitionTo;
  //     $delegate.transitionTo = function(to, toParams, options) {
  //       console.log(to, toParams, options);
  //       return originalTransitionTo(to, toParams, angular.extend({
  //         reload: true,
  //         inherit: false,
  //         notify: true
  //       }, options));
  //     };
  //     return $delegate;
  //   });
  // });

angular.module('lematClient.config', []) // these are classes with a static method 'init' so they run the config block
  // .run(config.CheckUsers.init)

angular.module('lematClient.filters', ['angular.filter'])
  .filter('characters', filters.characters)
  .filter('cut', filters.cut)
  .filter('escapeHtml', filters.escapeHtml)
  .filter('filterDocs', filters.filterDocs)
  .filter('filterImages', filters.filterImages)
  .filter('newlines', filters.newLines)
  .filter('spaceless', filters.spaceless)
  .filter('splitCharacters', filters.splitCharacters)
  .filter('toTrusted', filters.toTrusted)
  .filter('thumbnail', filters.thumbnail)
  .filter('words', filters.words);

// admin components
angular.module('lematClient.admin', ['angucomplete-alt', 'angular-confirm', 'angularTrix', 'lematClient.directives', 'lematClient.filters', 'lematClient.services']);

register('lematClient.admin').controller('EntriesAdminController', components.EntriesAdminController);
register('lematClient.admin').controller('IssuesAdminController', components.IssuesAdminController);
register('lematClient.admin').controller('PostsAdminController', components.PostsAdminController);
register('lematClient.admin').controller('SubmissionsAdminController', components.SubmissionsAdminController);

// core components
angular.module('lematClient.core', ['lematClient.directives', 'lematClient.filters'])

// editors
register('lematClient.core').controller('EditorsController', components.EditorsController);

// entries
register('lematClient.core').service('EntriesFactory', components.EntriesFactory);
register('lematClient.core').controller('EntriesController', components.EntriesController);

// images
register('lematClient.core').service('ImagesFactory', components.ImagesFactory);
register('lematClient.core').controller('ImagesController', components.ImagesController);
register('lematClient.core').controller('ImagesModalController', components.ImagesModalController);

// issues
register('lematClient.core').controller('IssuesController', components.IssuesController);
register('lematClient.core').service('IssuesFactory', components.IssuesFactory);
register('lematClient.core').service('PiecesFactory', components.PiecesFactory);
register('lematClient.core').directive('scroll', components.scroll);
register('lematClient.core').directive('scrollPosition', components.scrollPosition);

// // login
register('lematClient.core').controller('LoginController', components.LoginController);

// // posts
register('lematClient.core').controller('PostsController', components.PostsController)
register('lematClient.core').service('PostsFactory', components.PostsFactory);

// profile
register('lematClient.core').controller('ProfileController', components.ProfileController);

//submissions
register('lematClient.core').controller('SubmissionsController', components.SubmissionsController);
register('lematClient.core').service('SubmissionsFactory', components.SubmissionsFactory);

// users
register('lematClient.core').controller('UsersController', components.UsersController);
register('lematClient.core').service('UsersFactory', components.UsersFactory);

angular.module('lematClient.layout', ['ui.bootstrap.dropdown']);
register('lematClient.layout').controller('FooterController', components.FooterController);
register('lematClient.layout').controller('NavController', components.NavController);
