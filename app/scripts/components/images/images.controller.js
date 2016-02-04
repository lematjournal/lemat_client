import { ImageModal } from './images.decorator';

@ImageModal
export default class ImagesController {
  /*@ngInject*/
  constructor($scope, $uibModal, AuthFactory, AS3Factory, ImagesFactory) {
    this.$scope = $scope;
    this.$uibModal = $uibModal;
    this.AuthFactory = AuthFactory;
    this.AS3Factory = AS3Factory;
    this.ImagesFactory = ImagesFactory;
    this.images = ImagesFactory.images;
    // pagination
    $scope.currentPage = 1;
    $scope.pageChangeHandler = (num) => {
      console.log('going to page ' + num);
    };
    $scope.isAdmin = () => {
      return AuthFactory.isAdmin();
    };
  }

  deleteImage(image) {
    this.AS3Factory.deleteFile(image.image_url).then(() => {
      this.ImagesFactory.deleteImage(image.id).then(() => {
        this.images.splice(this.findImageIndex(image.id), 1);
      }, () => {
        console.log('error');
      });
    });
  };

  findImageIndex(id) {
    for (let i = 0; i < this.images.length; i++) {
      if (this.images[i].id === id) {
        return i;
      }
    }
  }
}
