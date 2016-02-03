export default class ProfileController {
  /*@ngInject*/
  constructor($scope, $rootScope, $uibModal, $location, $stateParams, AuthFactory, UsersFactory) {
    this.master = {};
    this.fields = [];
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.$uibModal = $uibModal;
    this.$location = $location;
    this.$stateParams = $stateParams;
    this.AuthFactory = AuthFactory;
    this.UsersFactory = UsersFactory;
    $scope.popover = {
      templateUrl: 'popoverTemplate.html',
    };
  }

  getProfile() {
    this.UsersFactory.getUser(this.$stateParams.profile).then(() => {
      this.user = this.UsersFactory.user;
    });
  };

  getUserProfile() {
    this.AuthFactory.setUser().then(() => {
      this.$rootScope.session = this.AuthFactory.session;
      this.UsersFactory.getProfile(this.$rootScope.session).then(() => {
        this.user = this.UsersFactory.profile;
        angular.copy(this.user, this.master);
      });
    });
  }

  upsertProfile(user) {
    if (this.AuthFactory.isAuthenticated() && !angular.equals(this.user, this.master)) {
      this.UsersFactory.upsertUser(user).then(() => {
        // toastr.success('User updated successfully', 'Done');
      });
    }
  };

  resetProfile() {
    this.$scope.user = this.$scope.master;
    toastr.info('User reset to last save', 'Done');
  }

  // profile image upload modal

  openImageUploadModal() {
    this.$uibModalInstance = $uibModal.open({
      templateUrl: 'scripts/core/profile/profile.image-upload.modal/profile.image-upload.modal.html',
      controller: 'ProfileImageUploadModalController',
      controllerAs: 'profileImageUploadModalCtrl',
      size: 'lg',
      resolve: {
        images: () => {
          return this.user.images;
        },
        userId: () => {
          return this.user.id;
        }
      }
    });

    this.$uibModalInstance.result.then((profileImage) => {
      this.user.profile_image = profileImage;
      this.upsertProfile(this.user);
    });
  }


  save(event, field, user) {
    this.fields[field] = !this.fields[field];
    this.upsertProfile(user);
  };

  reset(event) {
    if (event.keyCode === 27) {
      this.userForm.$rollbackViewValue();
    }
  };
}
