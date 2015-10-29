//'use strict';
//
//describe('Controller: EntriesController', function () {
//
//   // load the controller's module
//   beforeEach(module('lematClient.core.entries'));
//
//   var $scope, controller;
//
//   beforeEach(inject(function ($controller, $rootScope, EntryFactory) {
//      $scope = $rootScope.$new();
//      controller = $controller('EntriesController', {
//         $scope: $scope
//      });
//   }));
//
//   it('exists', function () {
//      expect(controller).toBeDefined();
//   });
//
//   it('gets all entries', inject(function (EntryFactory) {
//      expect($scope.getEntries).toBeDefined();
//      spyOn(EntryFactory, 'getEntries');
//      $scope.getEntries();
//      expect(EntryFactory.getEntries).toHaveBeenCalled();
//      expect($scope.entries).toBeDefined();
//   }));
//
//   it('gets a single entry', inject(function ($location, $routeParams, EntryFactory) {
//      expect($scope.getEntry).toBeDefined();
//      spyOn(EntryFactory, 'getEntry');
//      $scope.getEntry();
//      expect(EntryFactory.getEntry).toHaveBeenCalledWith($routeParams.id);
//      expect($scope.entry).toBeDefined();
//   }));
//});