describe('lemat module', function() {
  beforeEach(angular.mock.module('lematClient.core'));
  angular.mock.module('stateMock');
  angular.mock.module('ui-router');
  describe('submissions module', function() {
    var app, ctrl, compile, data, element, scope;
    beforeEach(angular.mock.module('lematClient.core.submissions'));
    describe('submissions form module', function() {
      beforeEach(angular.mock.module('lematClient.core.submissions.form'));
      beforeEach(angular.mock.inject(function($compile, $controller, $rootScope) {
        scope = $rootScope.$new();
        ctrl = $controller;
      }));

      it('scope should be defined', function() {
        expect(scope).toBeDefined();
      });

      it('test controller should be defined', function() {
        var submissionsCtrl = ctrl('SubmissionsFormController as submissionsFormCtrl', { $scope : scope });
        expect(submissionsCtrl).toBeDefined();
        expect(submissionsCtrl.name).toBe('submissionsFormCtrl');
      });

      it('should compile', inject(function($compile) {
        element = $compile('<lemat-submission-form></lemat-submission-form>')(scope);
        element = element.find('lemat-submission-form');
        expect(element.length).toBe(1);
      }));
    });
  });
});
