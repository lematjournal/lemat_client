import { Component, Inject } from 'ng-forward';
import ImagesComponent from '../images.component';
import AS3Factory from '../../../services/as3.factory'
import AuthFactory from '../../../services/authentication.factory'
import ImagesFactory from './../images.factory';
import 'angular-utils-pagination';
import 'babel-polyfill';

@Component({
  selector: 'image-modal',
  controllerAs: 'imagesModalCtrl',
  providers: ['angularUtils.directives.dirPagination', AS3Factory, AuthFactory, ImagesFactory],
  templateUrl: './scripts/images/images.modal/images.modal.html'
})

@Inject('$scope', '$rootScope', '$uibModalInstance', '$window', AS3Factory, AuthFactory, ImagesFactory)
export default class ImagesModalComponent extends ImagesComponent {
  constructor($scope, $rootScope, $uibModalInstance, $window, AS3Factory, AuthFactory, ImagesFactory, images) {
    super($scope, AuthFactory, AS3Factory, ImagesFactory, images);
    this.$rootScope = $rootScope;
    this.image = {};
    this.images = images;
    $scope.currentPage = 0;
    $scope.pageChangeHandler = (num) => {
      console.log('going to page ' + num);
    };
    $scope.ok = () => {
      $uibModalInstance.close(this.image);
    };

    $scope.cancel = () => {
      $uibModalInstance.dismiss('cancel');
    };

    $scope.openTab = () => {
      $window.open(this.images[$scope.currentPage - 1].image_url, '_blank')
    };
  }

  setImage(image) {
    this.image = image;
  }

  async upload(file, folder) {
    // let response = await this.AS3Factory.uploadFile(file, folder);
    // let s3Path = 'https://lematjournal.s3.amazonaws.com/' + response.params.Key;
    // this.$scope.filename = s3Path;
  }

  async uploadImage() {
    let image = {
      user_id: this.$rootScope.userId,
      image_url: this.image
    };
    await this.ImagesFactory.uploadImage(image);
    console.log(this.image.image_url, 'Image uploaded');
    this.images.push(image);
    this.$scope.currentIndex = this.images.length - 1;
    this.setImage(image);
  }
}
