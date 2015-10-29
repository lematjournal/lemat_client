//'use strict';
//
//describe('Factory: EntryFactory', function () {
//
//   // load the controller's module
//   beforeEach(module('lematClient.common.factories'));
//
//   var factory, entry, entries;
//
//   beforeEach(inject(function (EntryFactory) {
//      factory = EntryFactory;
//   }));
//   
//   it('it exists', function () {
//      expect(factory).toBeDefined();
//   });
//   
//   it('creates an entry', inject(function($httpBackend) {
//      $httpBackend.expectPOST('/entry', {
//         title: 'test',
//         content: 'test',
//         user_id: '1'
//      }).respond(200);
//   }));
//
//});