import ImagesFactory from './images.factory';

export function ImageModal(target) {
  let openImageModal = function() {
    this.$uibModalInstance = this.$uibModal.open({
      templateUrl: 'scripts/components/images/images.modal/images.modal.html',
      controller: 'ImagesModalController',
      controllerAs: 'imagesModalCtrl',
      size: 'lg',
      resolve: {
        images: (ImagesFactory) => { /*@ngInject*/
          ImagesFactory.getImages();
          return ImagesFactory.images;
        }
      }
    })
    this.$uibModalInstance.result.then(::this.imageModalCallback);
  }
  target.prototype.openImageModal = openImageModal;
}
