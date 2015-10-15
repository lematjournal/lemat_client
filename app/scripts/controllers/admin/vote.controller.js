'use strict';

angular.module('lematClient.controllers.admin').controller('VoteController', ['$scope', '$modalInstance', 'submission', function ($scope, $modalInstance, submission) {
   $scope.submission = submission;
   $scope.comment = {};

   $scope.ok = function () {
      $modalInstance.close($scope.submission, $scope.comment);
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
   }]);