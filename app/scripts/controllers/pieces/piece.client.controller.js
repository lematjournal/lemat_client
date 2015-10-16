(function (angular) {

   'use strict';

   angular.module('lematClient.controllers.pieces')
      .controller('PieceClientController', PieceClientController);

   PieceClientController.$inject = ['$scope', '$routeParams', '$location', 'PieceFactory'];

   function PieceClientController($scope, $routeParams, $location, PieceFactory) {
      var vm = this;
      
      vm.getPiece = function () {
         PieceFactory.getPiece($routeParams.id, $routeParams.piece);
         vm.piece = PieceFactory.piece;
      };
   }

})(angular);