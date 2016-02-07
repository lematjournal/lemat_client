import { bootstrap, Module } from 'a1atscript';
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
import 'angular-scroll';
import 'angular-ui-bootstrap';
import 'angular-ui-router';
import 'angular-utils-pagination';
import 'angular-youtube-embed';
import 'ng-device-detector';
import 'ng-file-upload';
import 'ngstorage';
import 're-tree';

angular.module('lematClient.directives', ['akoenig.deckgrid', 'angularUtils.directives.dirPagination','duScroll', 'ngFileUpload', 'ui.bootstrap.modal', 'ui.bootstrap.popover', 'youtube-embed']);
register('lematClient.directives').directive('lematRepeat', directives.lematRepeat);
register('lematClient.directives').directive('ngEnter', directives.ngEnter);
register('lematClient.directives').directive('ngEsc', directives.ngEsc);
register('lematClient.directives').directive('uiSrefIf', directives.uiSrefIf);

angular.module('lematClient.services', ['ngSanitize', 'ng.deviceDetector', 'ngStorage']);
register('lematClient.services').service('AuthFactory', factories.AuthFactory);
register('lematClient.services').service('AS3Factory', factories.AS3Factory);
register('lematClient.services').service('PermissionFactory', factories.PermissionFactory);
register('lematClient.services').service('UsersFactory', factories.UsersFactory);

angular.module('lematClient.config', []) // these are classes with a static method 'init' so they run the config block
  .config(config.Html5Mode.init)
  .config(AdminRoutes.routeFactory)
  .config(CoreRoutes.routeFactory)
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

// core components
angular.module('lematClient.core', ['lematClient.directives', 'lematClient.filters', 'ngStorage'])

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
let submissions = new Module('lematClient.core.submissions', ['lematClient.layout', components.SubmissionsForm, components.SubmissionsFactory]);

// users
register('lematClient.core').controller('UsersController', components.UsersController);
register('lematClient.core').service('UsersFactory', components.UsersFactory);

let layout = new Module('lematClient.layout', ['ui.bootstrap.dropdown', components.footer, components.nav, components.lematButton]);

let admin = new Module('lematClient.admin', ['angucomplete-alt', 'angular-confirm', 'angularTrix', 'lematClient.directives', 'lematClient.filters', 'lematClient.services', components.EntriesAdminController, components.IssuesAdminController, components.PostsAdminController, components.SubmissionsController]);

let app = new Module('lematClient', ['ui.router', admin, 'lematClient.config', 'lematClient.core', submissions, layout, 'lematClient.services']);

bootstrap(app);
