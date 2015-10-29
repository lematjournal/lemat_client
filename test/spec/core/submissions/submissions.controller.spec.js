'use strict';

describe('Controller: SubmissionsController', function () {

   // load the controller's module
   beforeEach(module('lematClient'));

   var scope, controller, window, httpBackend, location;

   // Initialize the controller and a mock scope
   beforeEach(inject(function ($injector, $controller, $rootScope, $location, $window, $httpBackend, AuthFactory) {
      scope = $rootScope.$new();
      controller = $controller('SubmissionsController as vm', {
         $scope: scope
      });
   }));

   it('exists', inject(function () {
      expect(controller).toBeDefined();
   }));
   
   it('posts a submission', inject(function () {
      var submission = {
         title: 'Why Shit is Fucked',
         name: 'Ian Delairre',
         submission_type: 'text',
         email_address: 'idelairre@gmail.com',
         tags: ['shit', 'is', 'fucked'],
         email_content: 'this is a rigorous description of why shit is totally fucked',
         attachments: ['https://amazonshitfuck.co.uk/fuuuuuuckkk.docx']
      };
      expect(scope.vm.postSubmission).toBeDefined();

   }));
});