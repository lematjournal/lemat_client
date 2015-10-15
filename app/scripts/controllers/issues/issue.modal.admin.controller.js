(function (angular) {

   'use strict';

   angular.module('lematClient.controllers.issues')
      .controller('IssueModalAdminController', IssueModalController);

   IssueModalController.$inject = ['$scope', '$rootScope', '$modalInstance', 'ImageFactory'];

   function IssueModalController($scope, $rootScope, $modalInstance, ImageFactory) {
      $scope.getImages = function () {
         ImageFactory.getImages().then(function () {
            $scope.images = ImageFactory.images;
         });
      };

      $scope.setIssueImage = function (imageUrl) {
         $scope.image_url = imageUrl;
         toastr.info('Issue cover image selected', 'Selected');
      };

      $scope.uploadImage = function () {
         var image = {
            user_id: $rootScope.userId,
            image_url: $scope.issue.image_url
         };
         ImageFactory.uploadImage(image).then(function () {
            ImageFactory.getImages();
         });
      };

      $scope.ok = function () {
         $modalInstance.close($scope.image_url);
      };

      $scope.cancel = function () {
         $modalInstance.dismiss('cancel');
      };
   }

})(angular);