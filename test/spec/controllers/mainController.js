'use strict';

describe('Controller: MainController', function () {

   // load the controller's module
   beforeEach(module('lematClient'));

   var scope, controller, window, httpBackend, location;

   // Initialize the controller and a mock scope
   beforeEach(inject(function ($injector, $controller, $rootScope, $location, $window, $httpBackend, AuthFactory) {
      scope = $rootScope.$new();
      controller = $controller('MainController', {
         $scope: scope
      });
   }));

   it('exists', inject(function () {
      expect(controller).toBeDefined();
   }));
   
   it('should spy on $location', inject(function ($location) {
      expect(scope.url).toBe($location.$$absUrl);
   }));
   
   it('should return whether the user is authenticated', function () {
      expect(scope.isAuthenticated()).toBe(false);
   });
   
});