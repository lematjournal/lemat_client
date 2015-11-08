(function (angular) {

   'use strict';

   function IssuesCoverModalController($scope, $rootScope, $uibModalInstance, ImagesFactory, images) {
      var vm = this;
      
      vm.images = images;
      
      vm.setIssueImage = function (imageUrl) {
         vm.image_url = imageUrl;
         toastr.info('Issue cover image selected', imageUrl);
      };

      vm.uploadImage = function () {
         var image = {
            user_id: $rootScope.userId,
            image_url: vm.issue.image_url
         };
         ImagesFactory.uploadImage(image).then(function () {
            ImagesFactory.getImages();
         });
      };

      $scope.ok = function () {
         $uibModalInstance.close(vm.image_url);
      };

      $scope.cancel = function () {
         $uibModalInstance.dismiss('cancel');
      };
      
      // pagination

      $scope.pageChangeHandler = function () {};

      $scope.currentPage = 1;
      
   }
   
   angular.module('lematClient.admin.issues')
      .controller('IssuesCoverModalController', IssuesCoverModalController);

   IssuesCoverModalController.$inject = ['$scope', '$rootScope', '$uibModalInstance', 'ImagesFactory', 'images'];

})(angular);