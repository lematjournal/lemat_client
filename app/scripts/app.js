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

@StateConfig([{
  name: 'admin',
  url: '/admin/',
  component: components.AdminComponent
}, {
  name: 'main',
  url: '/',
  component: components.MainComponent
}, {
  name: 'about',
  url: '/about/',
  component: components.AboutComponent
}, {
  name: 'editors',
  url: '/editors/',
  component: components.EditorsComponent
}, {
  name: 'entries',
  url: '/blog/',
  component: components.EntriesComponent,
  as: 'entriesCtrl'
}, {
  name: 'entries-detail',
  url: '/blog/:entry',
  component: components.EntriesDetailComponent,
  as: 'entriesDetailCtrl'
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
  name: 'pieces-detail',
  url: '/issues/:issue/:piece',
  component: components.PiecesDetailComponent,
  as: 'piecesDetailCtrl'
}, {
  name: 'posts',
  url: '/online/',
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
}, {
  name: 'submissions',
  url: '/submissions/',
  component: components.SubmissionsComponent
}, {
  name: 'submit',
  url: '/submit/',
  component: components.SubmissionsFormComponent
}])

@Component({
  selector: 'lemat-app',
  providers: [uiRouter],
  directives: [
    components.footer,
    components.header,
    components.nav,
  ],
  template: `
      <div class="container">
          <lemat-header></lemat-header>
          <lemat-nav></lemat-nav>
          <ui-view></ui-view>
          <lemat-footer></lemat-footer>
        </div>
      </div>
  `
})
class LematClient {}

bootstrap(LematClient, ['ui.router', config.RouteConfig.name]);
