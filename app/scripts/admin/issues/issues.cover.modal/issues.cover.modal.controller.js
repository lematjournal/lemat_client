(function (angular) {

   'use strict';

   function IssuesCoverModalController($scope, $rootScope, $modalInstance, ImagesFactory) {
      var vm = this;
            
      vm.getImages = function () {
         ImagesFactory.getImages().then(function () {
            vm.images = ImagesFactory.images;
         });
      };

      vm.setIssueImage = function (imageUrl) {
         vm.image_url = imageUrl;
         toastr.info('Issue cover image selected', 'Selected');
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
         $modalInstance.close(vm.image_url);
      };

      $scope.cancel = function () {
         $modalInstance.dismiss('cancel');
      };
   }
   
   angular.module('lematClient.admin.issues')
      .controller('IssuesCoverModalController', IssuesCoverModalController);

   IssuesCoverModalController.$inject = ['$scope', '$rootScope', '$modalInstance', 'ImagesFactory'];

})(angular);