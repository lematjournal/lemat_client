import angular from 'angular';
import uiRouter from 'angular-ui-router';
import { bootstrap, Component, Inject, StateConfig } from 'ng-forward';

import * as config from './config';
import * as components from './components/components.module';
import * as directives from './directives.module';
import * as factories from './factories.module';

import 'angucomplete-alt';
import 'angular-confirm';
import 'angular-filter';
import 'angular-mocks';
import 'angular-sanitize';
import 'angular-scroll';
import 'angular-wysiwyg/dist/angular-wysiwyg';
import 'angular-ui-bootstrap';
import 'angular-utils-pagination';
import 'angular-youtube-embed';
import 'angular-bootstrap-colorpicker';
import 'ng-device-detector';
import 'ng-file-upload';
import 'ngstorage';
import 're-tree';
import 'reflect-metadata';

// let DIRECTIVES = new Module('lematClient.directives', [
//   'angular-confirm',
//   'angucomplete-alt',
//   'akoenig.deckgrid',
//   'angularUtils.directives.dirPagination',
//   'colorpicker.module',
//   'duScroll',
//   'ngFileUpload',
//   'ui.bootstrap.modal',
//   'ui.bootstrap.popover',
//   'youtube-embed',
//   'wysiwyg.module'
// ]);
//
// let SERVICES = new Module('lematClient.services', ['ngSanitize', 'ng.deviceDetector']);
//
// angular.module('lematClient.config', []) // these are classes with a static method 'init' so they run the config block
//   .config(config.Html5Mode.init)
//   .config(AdminRoutes.routeFactory)
//   .config(CoreRoutes.routeFactory)
//   // .run(config.CheckUsers.init)
//
// angular.module('lematClient.filters', ['angular.filter'])
//
// let entries = new Module('lematClient.core.entries', [components.EntriesController, components.EntriesFactory]);
//
// let images = new Module('lematClient.core.images', [components.ImagesController, components.ImagesFactory, components.ImagesModalController]);
//
// let issues = new Module('lematClient.core.issues', [components.IssuesController, components.IssuesFactory, components.PiecesFactory, components.scroll, components.scrollPosition]);
//
// let posts = new Module('lematClient.core.posts', [components.PostsController, components.PostsFactory]);
//
// // let submissions = new Module('lematClient.core.submissions', [components.SubmissionsForm, components.SubmissionsFactory]);
//
// let users = new Module('lematClient.core.users', [components.UsersController, components.UsersFactory]);
//
// let LAYOUT = new Module('lematClient.layout', [components.footer, components.lematButton]);
//
// // let ADMIN = new Module('lematClient.admin', [
// //   'lematClient.filters',
// //   components.EntriesAdminController,
// //   components.IssuesAdminController,
// //   components.PostsAdminController,
// //   components.SubmissionsController
// // ]);
//
// let CORE = new Module('lematClient.core', [
//   'lematClient.filters',
//   components.EditorsController,
//   components.LoginController,
//   components.ProfileController,
//   entries,
//   issues,
//   posts,
//   users
// ]);

@StateConfig([{
  name: 'entries',
  url: '/',
  component: components.EntriesComponent,
  as: 'entriesCtrl'
}, {
  name: 'entries-detail',
  url: '/:entry',
  component: components.EntriesDetailComponent,
  as: 'entriesDetailCtrl'
}, {
  name: 'about',
  url: '/about/',
  component: components.AboutComponent
}, {
  name: 'editors',
  url: '/editors/',
  component: components.EditorsComponent
}, {
  name: 'issues',
  url: '/issues/',
  component: components.IssuesComponent,
  as: 'issuesCtrl'
}, {
  name: 'issues-detail',
  url: '/issues/:issue',
  component: components.IssuesDetailComponent,
  as: 'issuesDetailCtrl'
}, {
  name: 'posts',
  url: '/posts/',
  component: components.PostsComponent,
  as: 'postsCtrl'
}, {
  name: 'posts-detail',
  url: '/posts/:post',
  component: components.PostsDetailComponent,
  as: 'postsDetailCtrl'
},{
  name: 'profile',
  url: '/user/:profile',
  component: components.ProfileDetailComponent,
  as: 'profileDetailCtrl'
}, {
  name: 'profile-edit',
  url: '/profile/',
  component: components.ProfileEditComponent,
  as: 'profileEditCtrl'
}, {
  name: 'login',
  url: '/login/',
  component: components.LoginComponent,
  as: 'loginCtrl'
}])

@Component({
  selector: 'lemat-app',
  providers: [uiRouter],
  directives: [
    components.footer,
    components.nav,
    components.AboutComponent,
    components.EntriesComponent,
    components.IssuesComponent,
    components.IssuesDetailComponent,
    components.PostsComponent,
    components.PostsDetailComponent,
    components.ProfileDetailComponent,
    components.ProfileEditComponent,
    components.LoginComponent
  ],
  template: `
      <div class="container">
        <div class="row">
           <h1 class="title" ><a ui-sref="entries">LE MAT</a> // <a ui-sref="issues-detail({ issue: 1 })">ISSUE</a> // <a ui-sref="posts">ONLINE</a></h1>
        </div>
          <lemat-nav></lemat-nav>
          <ui-view></ui-view>
          <lemat-footer></lemat-footer>
        </div>
      </div>
  `
})
class LematClient {}

bootstrap(LematClient, ['ui.router', config.RouteConfig.name]);
