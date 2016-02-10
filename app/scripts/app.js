import { bootstrap, Module } from 'a1atscript';
import angular from 'angular';
import AuthFactory from './services/authentication.factory';
import AdminRoutes from './routes/admin.routes';
import CoreRoutes from './routes/core.routes';
import * as config from './config';
import * as components from './components/components.module';
import * as filters from './filters.module';
import * as factories from './factories.module';
import * as directives from './directives.module';

import 'angucomplete-alt';
import 'angular-confirm';
import 'angular-deckgrid';
import 'angular-filter';
import 'angular-mocks';
import 'angular-sanitize';
import 'angular-scroll';
import 'angular-wysiwyg/dist/angular-wysiwyg';
import 'angular-ui-bootstrap';
import 'angular-ui-router';
import 'angular-utils-pagination';
import 'angular-youtube-embed';
import 'angular-bootstrap-colorpicker';
import 'ng-device-detector';
import 'ng-file-upload';
import 'ngstorage';
import 're-tree';
import 'reflect-metadata';

let DIRECTIVES = new Module('lematClient.directives', [
  'angular-confirm',
  'angucomplete-alt',
  'akoenig.deckgrid',
  'angularUtils.directives.dirPagination',
  'colorpicker.module',
  'duScroll',
  'ngFileUpload',
  'ui.bootstrap.modal',
  'ui.bootstrap.popover',
  'youtube-embed',
  'wysiwyg.module'
]);

let SERVICES = new Module('lematClient.services', ['ngSanitize', 'ng.deviceDetector', 'ngStorage', factories.AuthFactory, factories.AS3Factory, factories.PermissionFactory]);

angular.module('lematClient.config', []) // these are classes with a static method 'init' so they run the config block
  .config(config.Html5Mode.init)
  .config(AdminRoutes.routeFactory)
  .config(CoreRoutes.routeFactory)
  // .run(config.CheckUsers.init)

angular.module('lematClient.filters', ['angular.filter'])

let entries = new Module('lematClient.core.entries', [components.EntriesController, components.EntriesFactory]);

let images = new Module('lematClient.core.images', [components.ImagesController, components.ImagesFactory, components.ImagesModalController]);

let issues = new Module('lematClient.core.issues', [components.IssuesController, components.IssuesFactory, components.PiecesFactory, components.scroll, components.scrollPosition]);

let posts = new Module('lematClient.core.posts', [components.PostsController, components.PostsFactory]);

// let submissions = new Module('lematClient.core.submissions', [components.SubmissionsForm, components.SubmissionsFactory]);

let users = new Module('lematClient.core.users', [components.UsersController, components.UsersFactory]);

let LAYOUT = new Module('lematClient.layout', ['ui.bootstrap.dropdown', components.footer, components.nav, components.lematButton]);

let ADMIN = new Module('lematClient.admin', [
  'lematClient.filters',
  components.EntriesAdminController,
  components.IssuesAdminController,
  components.PostsAdminController,
  components.SubmissionsController
]);

let CORE = new Module('lematClient.core', [
  'lematClient.filters',
  components.EditorsController,
  components.LoginController,
  components.ProfileController,
  entries,
  issues,
  posts,
  users
]);

let app = new Module('lematClient', [SERVICES, 'ui.router', 'lematClient.config', DIRECTIVES, CORE, LAYOUT]);

bootstrap(app);
