(function (angular) {

   'use strict';

   angular.module('lematClient.controllers.admin')
      .controller('VoteController', VoteController);

   VoteController.$inject = ['$scope', '$modalInstance', 'submission'];

   function VoteController($scope, $modalInstance, submission) {
      var vm = this;
      vm.submission = submission;
      vm.comment = {};

      $scope.ok = function () {
         $modalInstance.close(vm.submission, vm.comment);
      };

      $scope.cancel = function () {
         $modalInstance.dismiss('cancel');
      };

      $scope.submission.customMenu = [
            ['bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript'],
            ['remove-format'],
            ['ordered-list', 'unordered-list', 'outdent', 'indent'],
            ['code', 'quote', 'paragraph'],
            ['link']
        ];
   }

})(angular);