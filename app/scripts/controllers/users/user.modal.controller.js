(function (angular) {

   'use strict';

   angular.module('lematClient.controllers.users')
      .controller('UserModalController', UserModalController);

   UserModalController.$inject = ['$scope', '$rootScope', '$uibModal', '$location', '$route', '$routeParams', 'AuthFactory', 'UserFactory'];

   function UserModalController($scope, $rootScope, $uibModal, $location, $route, $routeParams, AuthFactory, UserFactory) {
      $scope.file = {};
      $scope.images = [];

      $scope.getUserImages = function () {
         UserFactory.getUser($routeParams.user).then(function () {
            $scope.images = UserFactory.user.images;
         });
      };

      $scope.openImageManager = function () {
         $scope.$modalInstance = $uibModal.open({
            scope: $scope,
            controller: 'ImageController',
            templateUrl: 'views/admin/modals/profile-image-manager.html',
            size: 'lg'
         });
      };
   }
   
})(angular);