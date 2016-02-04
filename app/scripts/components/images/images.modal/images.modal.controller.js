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
    $scope.currentPage = 1;
    $scope.pageChangeHandler = (num) => {
      console.log('going to page ' + num);
    };
  }

  setImage(image) {
    this.image = image;
  };

  upload(file, folder) {
    let deferred = this.$q.defer();
    deferred.resolve(this.AS3Factory.uploadFile(file, folder).then((response) => {
      let s3Path = 'https://lematjournal.s3.amazonaws.com/' + response.params.Key;
      this.$scope.filename = s3Path;
    }));
    return deferred.promise;
  };

  uploadImage() {
    let image = {
      user_id: this.$rootScope.userId,
      image_url: this.image
    };
    this.ImagesFactory.uploadImage(image).then(() => {
      console.log(this.image.image_url, 'Image uploaded');
      this.images.push(image);
      this.$scope.currentIndex = this.images.length - 1;
      this.setImage(image);
    });
  }

  ok () {
    this.$uibModalInstance.close(this.image);
  };

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }


  openTab() {
    this.$window.open(this.images[this.$scope.currentPage - 1].image_url, '_blank')
  }
}
