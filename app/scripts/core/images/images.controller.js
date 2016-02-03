export default class ImagesController {
  /*@ngInject*/
  constructor($scope, AuthFactory, AS3Factory, ImagesFactory) {
    // pagination
    $scope.currentPage = 1;
    $scope.isAdmin = function() {
      return AuthFactory.isAdmin();
    };
  }

  getImages() {
    ImagesFactory.getImages().then(function() {
      this.images = ImagesFactory.images;
    });
  };

  deleteImage(image) {
    AS3Factory.deleteFile(image.image_url).then(function() {
      ImagesFactory.deleteImage(image.id).then(function() {
        this.images.splice(findImageIndexById(image.id), 1);
      }, function() {
        console.log('error');
      });
    });
  };

  findImageIndexById(id) {
    for (var i = 0; i < this.images.length; i++) {
      if (this.images[i].id === id) {
        return i;
      }
    }
  }
}
