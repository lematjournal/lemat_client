'use strict';

angular.module('lematClient', ['ngCookies', 'ngResource', 'ngRoute', 'ngSanitize', 'ngTouch', 'ui.bootstrap', 'ngAside', 'duScroll',  'angular.filter', 'wysiwyg.module', 'ng.deviceDetector', 'angularUtils.directives.dirPagination', 'angularUtils.directives.dirDisqus', 'validation.match', 'ui.bootstrap', 'angucomplete-alt', 'ngTagsInput', 'flow'])
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
     flowFactoryProvider.on('catchAll', function (event) {
       console.log('catchAll', arguments);
     });
      $locationProvider.html5Mode(false).hashPrefix('!');
		$routeProvider
		// front page
			.when('/', {
				templateUrl: 'views/main.html',
				controller: 'EntryController'
			})
			// entry admin
			.when('/entry-admin', {
				templateUrl: 'views/forms/entry-admin.html',
				controller: 'EntryController'
			})
			// create entry
			.when('/entry-create', {
				templateUrl: 'views/forms/entry-create.html',
				controller: 'EntryController'
			})
			// entry edit
			.when('/entry/:id/edit', {
				templateUrl: 'views/forms/entry-edit.html',
				controller: 'EntryController'
			})
			// entry view
			.when('/entry/:id', {
				templateUrl: 'views/entry-view.html',
				controller: 'EntryController'
			})
			// issue admin
			.when('/issue-admin', {
				templateUrl: 'views/forms/issue-admin.html',
				controller: 'IssueController'
			})
			.when('/issues/', {
				templateUrl: 'views/issue-list.html',
				controller: 'IssueController'
			})
			// issue view
			.when('/issue/:id', {
				templateUrl: 'views/issue.html',
				controller: 'IssueController'
			})
			// edit issue
			.when('/issue/:id/edit', {
				templateUrl: 'views/forms/issue-edit.html',
				controller: 'IssueController'
			})
			// edit pieces attached to issue
			.when('/issue/:id/:piece/edit', {
				templateUrl: 'views/forms/piece-edit.html',
				controller: 'IssueController'
			})
			// add pieces to issue
			.when('/piece-create', {
				templateUrl: 'views/forms/piece-create.html',
				controller: 'IssueController'
			})
			// piece view
			.when('/issue/:id/:piece', {
				templateUrl: 'views/forms/piece-preview.html',
				controller: 'IssueController'
			})
			// show issue cover image
			.when('/issue/:id/image/:image_title', {
				templateUrl: 'views/image-view.html',
				controller: 'IssueController'
			})
			// view all posts
			.when('/online', {
				templateUrl: 'views/online.html',
				controller: 'PostController'
			})
			// admin for posts
			.when('/online-admin', {
				templateUrl: 'views/forms/online-admin.html',
				controller: 'PostController'
			})
         // create post view
			.when('/post-create', {
				templateUrl: 'views/forms/post-create.html',
				controller: 'PostController'
			})
         // edit post view
			.when('/:post/edit', {
				templateUrl: 'views/forms/post-edit.html',
				controller: 'PostController'
			})
			.when('/online/:post', {
				templateUrl: 'views/post-view.html',
				controller: 'PostController'
			})
         // user admin
         .when('/user-admin', {
            templateUrl: 'views/forms/user-admin.html',
            controller: 'UserController'
         })
         .when('/user-create', {
            templateUrl: 'views/forms/user-create.html',
            controller: 'UserController'
         })
         .when('/user/:user/edit', {
            templateUrl: 'views/forms/user-edit.html',
            controller: 'UserController'
         })
         // user view
         .when('/user/:user', {
            templateUrl: 'views/user-view.html',
            controller: 'UserController'
         })
         // control panel
         .when('/control-panel', {
            templateUrl: 'views/forms/control-panel.html',
         })
			.when('/submissions', {
				templateUrl: 'views/submissions.html'
			})
			.when('/editors', {
				templateUrl: 'views/editors.html',
            controller: 'UserController'
			})
			.when('/about', {
				templateUrl: 'views/about.html'
			})
			// authentication
			.when('/login', {
				templateUrl: 'views/login.html',
				controller: 'AdminController'
			})
			.otherwise({
				redirectTo: '/'
			});
	}]);