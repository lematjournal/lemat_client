(function (angular) {

   'use strict';


   function PostClientController($scope, $location, $routeParams, PostFactory) {
      var vm = this;
      
      vm.getPost = function () {
         PostFactory.getPost($routeParams.post);
         vm.post = PostFactory.post;
      };

      vm.getPosts = function () {
         PostFactory.getPosts();
         vm.posts = PostFactory.posts;
      };

      // filters for online view

      $scope.$on('filter', function (event, data) {
         $scope.filters = data;
         $location.path('/online');
      });
      
      $scope.popover = {
         templateUrl: 'tag-popover.template.html',
      };
   }
   
   angular.module('lematClient.controllers.posts')
      .controller('PostClientController', PostClientController);
   
   PostClientController.$inject = ['$scope', '$location', '$routeParams', 'PostFactory'];
   
})(angular);