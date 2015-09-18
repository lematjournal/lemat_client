'use strict';

angular.module('lematClient', ['ngCookies', 'ngResource', 'ngRoute', 'ngSanitize', 'ngTouch', 'ui.bootstrap', 'ngAside', 'duScroll', 'ngWig', 'angular.filter', 'wysiwyg.module', 'angularUtils.directives.dirPagination'])
	.value('duScrollDuration', 2000)
	.value('duScrollOffset', 30)
	.config(function ($routeProvider) {
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
			// preview pieces from admin view
			.when('/issue/:id/:piece', {
				templateUrl: 'views/forms/piece-preview.html',
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
			.when('/create-post', {
				templateUrl: 'views/forms/post-create.html',
				controller: 'PostController'
			})
			.when('/:post/edit', {
				templateUrl: 'views/forms/post-edit.html',
				controller: 'PostController'
			})
			.when('/online/:post', {
				templateUrl: 'views/post-view.html',
				controller: 'PostController'
			})
			.when('/submissions', {
				templateUrl: 'views/submissions.html'
			})
			.when('/editors', {
				templateUrl: 'views/editors.html'
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
	});