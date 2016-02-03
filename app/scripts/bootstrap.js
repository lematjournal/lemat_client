'use strict';

module.exports = function(app) {
	// Directives
	app.directive('fileSelectDirective', require('./services/directives/file-select.directive'));
	app.directive('fileDirective', require('./services/directives/file.directive'));
	app.directive('lematRepeatDirective', require('./services/directives/lemat-repeat.directive'));
	app.directive('loadingDirective', require('./services/directives/loading.directive'));
	app.directive('ngEnterDirective', require('./services/directives/ng-enter.directive'));
	app.directive('ngEscDirective', require('./services/directives/ng-esc.directive'));
	app.directive('sameHeightDirective', require('./services/directives/same-height.directive'));
	app.directive('uiSrefIfDirective', require('./services/directives/ui-sref-if.directive'));
	app.directive('uploadFileDirective', require('./services/directives/upload-file.directive'));
	// Factorys
	app.factory('As3Factory', require('./services/factories/as3.factory'));
	app.factory('AuthenticationFactory', require('./services/factories/authentication.factory'));
	app.factory('PermissionFactory', require('./services/factories/permission.factory'));
	app.factory('UsersFactory', require('./services/factories/users.factory'));
	// Filters
	app.filter('charactersFilter', require('./services/filters/characters.filter'));
	app.filter('cutFilter', require('./services/filters/cut.filter'));
	app.filter('escapeHtmlFilter', require('./services/filters/escape-html.filter'));
	app.filter('filterDocsFilter', require('./services/filters/filter-docs.filter'));
	app.filter('filterImagesFilter', require('./services/filters/filter-images.filter'));
	app.filter('newLinesFilter', require('./services/filters/new-lines.filter'));
	app.filter('spacelessFilter', require('./services/filters/spaceless.filter'));
	app.filter('splitCharactersFilter', require('./services/filters/split-characters.filter'));
	app.filter('toTrustedFilter', require('./services/filters/to-trusted.filter'));
	app.filter('wordsFilter', require('./services/filters/words.filter'));
	// Services
	app.service('constantsModule', require('./services/constants.module'));
	app.service('directivesModule', require('./services/directives.module'));
	app.service('factoriesModule', require('./services/factories.module'));
	app.service('filtersModule', require('./services/filters.module'));
};