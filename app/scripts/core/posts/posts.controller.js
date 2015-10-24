(function (angular) {

   'use strict';

   function PostsController($scope, $location, $stateParams, PostsFactory) {
      var vm = this;
            
      vm.getPost = function () {
         PostsFactory.getPost($stateParams.post).then(function () {
            vm.post = PostsFactory.post;
         });
      };

      vm.getPosts = function () {
         PostsFactory.getPosts().then(function () {
            vm.posts = PostsFactory.posts;
         });
      };
      
      $scope.popover = {
         templateUrl: 'tag-popover.template.html',
      };
      
   }
   
   angular.module('lematClient.core.posts')
      .controller('PostsController', PostsController);
   
   PostsController.$inject = ['$scope', '$location', '$stateParams', 'PostsFactory'];
   
})(angular);