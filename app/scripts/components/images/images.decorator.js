import ImagesFactory from './images.factory';
import ImagesModalComponent from './images.modal/images.modal.component';
import ImagesComponent from './images.component';
import 'angular-utils-pagination';

export function ImageModal(target) {
  let openImageModal = function() {
    this.$uibModalInstance = this.$uibModal.open({
      templateUrl: 'scripts/components/images/images.modal/images.modal.html',
      controller: ImagesModalComponent,
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
