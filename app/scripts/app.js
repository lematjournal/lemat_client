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
import 'angular-filter';
import 'angular-mocks';
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

angular.module('lematClient.directives', ['angucomplete-alt', 'akoenig.deckgrid', 'angularTrix', 'angularUtils.directives.dirPagination', 'duScroll', 'ngFileUpload', 'ui.bootstrap.modal', 'ui.bootstrap.popover', 'youtube-embed']);
// register('lematClient.directives').directive('deckgrid', directives.angularDeckgrid);
register('lematClient.directives').directive('lematRepeat', directives.lematRepeat);
register('lematClient.directives').directive('ngEnter', directives.ngEnter);
register('lematClient.directives').directive('ngEsc', directives.ngEsc);
register('lematClient.directives').directive('uiSrefIf', directives.uiSrefIf);

let services = new Module('lematClient.services', ['ngSanitize', 'ng.deviceDetector', 'ngStorage', factories.AuthFactory, factories.AS3Factory, factories.PermissionFactory]);

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

let entries = new Module('lematClient.core.entries', [components.EntriesController, components.EntriesFactory]);

let images = new Module('lematClient.core.images', [components.ImagesController, components.ImagesFactory, components.ImagesModalController]);

let issues = new Module('lematClient.core.issues', [components.IssuesController, components.IssuesFactory, components.PiecesFactory, components.scroll, components.scrollPosition]);

let posts = new Module('lematClient.core.posts', [components.PostsController, components.PostsFactory]);

let submissions = new Module('lematClient.core.submissions', [components.SubmissionsForm, components.SubmissionsFactory]);

let users = new Module('lematClient.core.users', [components.UsersController, components.UsersFactory]);

let layout = new Module('lematClient.layout', ['ui.bootstrap.dropdown', components.footer, components.nav, components.lematButton]);

let admin = new Module('lematClient.admin', [
  'angular-confirm',
  'lematClient.directives',
  'lematClient.filters',
  components.EntriesAdminController,
  components.IssuesAdminController,
  components.PostsAdminController,
  components.SubmissionsController
]);

let core = new Module('lematClient.core', [
  'lematClient.directives',
  'lematClient.filters',
  components.EditorsController,
  components.LoginController,
  components.ProfileController,
  entries,
  issues,
  posts,
  users,
  submissions
]);

let app = new Module('lematClient', [services, 'ui.router', 'lematClient.config', 'lematClient.directives', core, layout]);

bootstrap(app);
