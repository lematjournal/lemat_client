import angular from 'angular';
import AuthFactory from './services/factories/authentication.factory';
import CoreRoutes from './routes/core.routes';
import * as config from './config';
import * as core from './core/core.module';
import * as filters from './services/filters.module';
import * as factories from './services/factories.module';
import * as directives from './services/directives.module';
import register from './utils/register';

import 'angular-deckgrid';
import 'angular-filter';
import 'angular-sanitize';
import 'angular-ui-bootstrap';
import 'angular-ui-router';
import 'angular-youtube-embed';
import 'ng-device-detector';
import 're-tree';
import 'ngstorage';

angular.module('lematClient.directives', []);

angular.module('lematClient.services', ['ngSanitize', 'ng.deviceDetector', 'ngStorage']);
register('lematClient.services').service('AuthFactory', factories.AuthFactory);
register('lematClient.services').service('AS3Factory', factories.AS3Factory);
register('lematClient.services').service('PermissionFactory', factories.PermissionFactory);
register('lematClient.services').service('UsersFactory', factories.UsersFactory);
// register('lematClient.services').directive('sameHeight', directives.sameHeight);

angular.module('lematClient', ['ui.router', 'lematClient.config', 'lematClient.core', 'lematClient.directives', 'lematClient.filters', 'lematClient.layout', 'lematClient.services'])
  .config(config.Html5Mode.init)
  .config(CoreRoutes.routeFactory)

angular.module('lematClient.config', []) // these are classes with a static method 'init' so they run the config block
  .run(config.CheckUsers.init)
  .run(config.Refresh.init)

angular.module('lematClient.filters', ['angular.filter'])
  .filter('characters', filters.characters)
  .filter('cut', filters.cut)
  .filter('escapeHtml', filters.escapeHtml)
  .filter('filterDocs', filters.filterDocs)
  .filter('newlines', filters.newLines)
  .filter('spaceless', filters.spaceless)
  .filter('splitCharacters', filters.splitCharacters)
  .filter('toTrusted', filters.toTrusted)
  .filter('words', filters.words);

angular.module('lematClient.core', ['ngSanitize', 'akoenig.deckgrid', 'ui.bootstrap.modal', 'youtube-embed'])
// .config(config.taOptions());

register('lematClient.core').controller('EditorsController', core.EditorsController);

// entries
register('lematClient.core').service('EntriesFactory', core.EntriesFactory);
register('lematClient.core').controller('EntriesController', core.EntriesController);

// images

register('lematClient.core').controller('ImagesController', core.ImagesController);
register('lematClient.core').service('ImagesFactory', core.ImagesFactory);

// issues
register('lematClient.core').controller('IssuesController', core.IssuesController);
register('lematClient.core').service('IssuesFactory', core.IssuesFactory);
register('lematClient.core').service('PiecesFactory', core.PiecesFactory);
register('lematClient.core').directive('scroll', core.scroll);
register('lematClient.core').directive('scrollPosition', core.scrollPosition);

// login
register('lematClient.core').controller('LoginController', core.LoginController);

// posts
register('lematClient.core').controller('PostsController', core.PostsController)
register('lematClient.core').service('PostsFactory', core.PostsFactory);

// profile
register('lematClient.core').controller('ProfileController', core.ProfileController);

//submissions
register('lematClient.core').controller('SubmissionsController', core.SubmissionsController);
register('lematClient.core').service('SubmissionsFactory', core.SubmissionsFactory);

// let submissions = angular.module('lematClient.submissions', []).controller('SubmissionsController', SubmissionsController);

// let profile = angular.module('lematClient.profile',[])
// profile.controller('ProfileController', ProfileController)
// profile.controller('ProfileImageUploadModalController', ProfileImageUploadModalController);

angular.module('lematClient.layout', ['ui.bootstrap.dropdown']);
register('lematClient.layout').controller('FooterController', core.FooterController);
register('lematClient.layout').controller('NavController', core.NavController);
