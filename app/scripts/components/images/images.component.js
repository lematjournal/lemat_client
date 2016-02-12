import { Component, Inject } from 'ng-forward';
import { ImageModal } from './images.decorator';
import AS3Factory from '../../services/as3.factory'
import AuthFactory from '../../services/authentication.factory'
import ImagesFactory from './images.factory';
// import ImagesModalComponent from './images.modal/images.modal.component';

@Component({
  selector: 'images',
  providers: ['ui.bootstrap.modal', AS3Factory, AuthFactory, ImagesFactory],
  templateUrl: './scripts/components/images/images.html'
})

@ImageModal
@Inject('$scope', '$uibModal', AuthFactory, AS3Factory, ImagesFactory)
export default class ImagesComponent {
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
    try {
      this.AS3Factory.deleteFile(image.image_url)
      this.ImagesFactory.deleteImage(image.id)
      this.images.splice(this.findImageIndex(image.id), 1);
    } catch (error) {
      console.error(error);
    }
  }

  findImageIndex(id) {
    for (let i = 0; i < this.images.length; i++) {
      if (this.images[i].id === id) {
        return i;
      }
    }
  }
}
