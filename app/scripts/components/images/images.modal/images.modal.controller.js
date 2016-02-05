import 'babel-polyfill';

export default class ImagesModalController {
  /*@ngInject*/
  constructor($scope, $rootScope, $uibModalInstance, $q, $window, AS3Factory, ImagesFactory, images) {
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.$uibModalInstance = $uibModalInstance;
    this.$q = $q;
    this.$window = $window;
    this.AS3Factory = AS3Factory;
    this.ImagesFactory = ImagesFactory;
    this.image = {};
    this.images = images;
    $scope.currentPage = 0;
    $scope.pageChangeHandler = (num) => {
      console.log('going to page ' + num);
    };
    $scope.ok = () => {
      this.$uibModalInstance.close(this.image);
    };

    $scope.cancel = () => {
      this.$uibModalInstance.dismiss('cancel');
    };

    $scope.openTab = () => {
      this.$window.open(this.images[$scope.currentPage - 1].image_url, '_blank')
    };
  }

  setImage(image) {
    this.image = image;
  }

  upload(file, folder) {
    let deferred = this.$q.defer();
    deferred.resolve(this.AS3Factory.uploadFile(file, folder).then((response) => {
      let s3Path = 'https://lematjournal.s3.amazonaws.com/' + response.params.Key;
      this.$scope.filename = s3Path;
    }));
    return deferred.promise;
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
