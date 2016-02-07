import { Controller } from 'a1atscript';
import ServerUrl from '../../services/constants.module';

@Controller('SubmissionsController', ['$scope', '$filter', '$rootScope', '$localStorage', '$state', '$stateParams', '$window', 'SubmissionsFactory'])
export default class SubmissionsController {
  constructor($scope, $filter, $rootScope, $localStorage, $state, $stateParams, $window, SubmissionsFactory) {
    this.$scope = $scope;
    this.$scope.$storage = $localStorage
    // .$default({
    //   submission: {
    //     attachments: [],
    //     submission_type: null,
    //     title: null,
    //     user: {
    //       username: null,
    //       email_address: null
    //     }
    //   }
    // });
    this.submission = this.$scope.$storage.submission;
    this.$q = $q;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.$window = $window;

    this.imagePopover = {
      templateUrl: 'image-popover.template.html'
    };
    this.tagPopover = {
      templateUrl: 'tag-popover.template.html'
    };
    this.showEdit = false;
    // $scope.$on('refresh', this.watchRefresh());

    // $scope.$watch(this.watchSubmission());
  }

  watchSubmission(val, newVal) {
    return () => {
      return this.submission.submission_type;
    }, (val, newVal) => {
      if (val !== newVal && this.$state.current !== 'main.submissions-thank-you') {
        if (this.submission.attachments.length > 0) {
          this.resetAttachments();
          toastr.info('Resetting attachments', 'Submission type changed');
        }
      }
    }
  }

  /**
   * Utility method to reset submission.
   */
  resetSubmission() {
    this.$scope.$storage.submission = {};
    this.$scope.$storage.submission.attachments = [];
    this.$scope.$storage.doc = {};
    this.doc = this.$scope.$storage.doc;
    this.submission = this.$scope.$storage.submission;
    this.submission.attachments = this.$scope.$storage.submission.attachments;
  }

  /**
   * Utility method to clear all attachments by resetting local storage.
   */
  resetAttachments() {
    this.$scope.$storage.submission.attachments = [];
    this.$scope.$storage.doc = {};
    this.submission.attachments = this.$scope.$storage.submission.attachments;
    this.doc = this.$scope.$storage.doc;
  }

  imagesPresent() {
    return !!this.$filter('filterImages')(this.submission.attachments);
  }

  documentPresent() {
    return typeof this.doc === 'string';
  }

  /**
   * Submits video link. If there is already a link
   * it clears the attachment array and pushes the new link.
   */
  submitVideo() {
    if (this.submission.attachments.length === 0) {
      this.submission.attachments.push(this.submission.link);
    } else {
      this.submission.attachments[0] = this.submission.link;
    }
    toastr.info('', 'Video submitted');
  }

  /**
   * Takes html stored in 'vm.doc' and generates a file blob to post to Amazon S3.
   * There is only one document attachment allowed so the method searches for any other
   * '.docx' files in the attachment array and replaces them with the new file
   */
  uploadDoc() {
    let fileName = this.submission.title + '-' + this.submission.user.username + '-' + Date.now().toString() + '.docx';
    this.convertHtmlToDocx(this.doc, fileName).then((response) => {
      let s3Path = response.data;
      console.log(response.data);
      if (this.submission.attachments && this.$filter('filterDocs')(this.submission.attachments).length === 0) {
        this.submission.attachments.push(s3Path);
      } else {
        for (let i = 0; this.submission.attachments.length > i; i++) {
          if (!(/\.(gif|jpg|jpeg|tiff|png)$/i).test(this.submission.attachments[i])) {
            this.submission.attachments[i] = s3Path;
          }
        }
      }
    });
  };

  /**
   * Clears all attachments, if there are images present in the attachment array
   * it will delete their corresponding Rails SQL entry.
   * Resets dom and attachment array.
   */
  clearAttachments() {
    for (let i = 0; this.submission.attachments.length > i; i++) {
      if (this.submission.attachments[i].image_url) {
        let image = this.submission.attachments[i].image_url;
        this.AS3Factory.deleteFile(image);
      } else {
        let attachment = this.submission.attachments[i];
        this.AS3Factory.deleteFile(attachment);
      }
    }
    this.$scope.$storage.submission.attachments = [];
    this.$scope.$storage.doc = {};
    this.doc = this.$scope.$storage.doc;
    this.submission.attachments = this.$scope.$storage.submission.attachments;
  };

  /**
   * Takes an attachment as an argument. Checks to see if it is an image,
   * if its an image it deletes the Amazon S3 file and corresponding entry in the Rails database.
   * Since documents aren't stored, they are simply deleted from Amazon S3
   * @summary Deletes an attachment
   * @param {Object} attachment
   */
  deleteFile(attachment) {
    if ((/\.(gif|jpg|jpeg|tiff|png)$/i).test(attachment.image_url)) {
      this.AS3Factory.deleteFile(attachment.image_url).then(() => {
        this.ImagesFactory.deleteImage(attachment.id).then(() => {
          this.submission.attachments.splice(this.findFileIndexById(attachment.id), 1);
        }, () => {
          console.log('error');
        });
      });
    } else {
      this.AS3Factory.deleteFile(attachment);
    }
  };

  /**
   * Sends '.docx' attachment url to the back-end where it is retrieved and converted to html
   * @returns {Object} Promise containing a string of the converted html
   */
  convertDocxToHtml() {
    let deferred = this.$q.defer();
    let params = {
      submission: {
        document: $filter('filterDocs')(this.submission.attachments)[0]
      }
    };
    this.$http.post(ServerUrl + '/submissions/render-doc', params).then((response) => {
      this.doc = response.data;
      toastr.success('You can edit your submission in the browser.', 'Preview Generated');
      deferred.resolve(this.doc);
    }, (errors) => {
      console.log(errors);
      deferred.reject(errors);
      toastr.info('This happens when the file format contains irregular data, we\'re working on being able to generate previews in all cases.', 'Could not generate preview');
    });
    return deferred.promise;
  }

  /**
   * Evaluates if vm.doc has been populated with a preview.
   * Called on the view to determine whether the 'preview document' div appears.
   * @returns {Boolean} true if the preview string was generated, otherwise false
   */
  evaluateDoc() {
    return typeof this.doc === 'string';
  }

  /**
   * Posts an Html string to the back-end to convert it to a ".docx" file
   * @param   {String} htmlString  Html string taken from vm.doc
   * @param   {String} fileName  randomly generated unique filename
   * @returns {String} Amazon S3 key of the uploaded file
   */
  convertHtmlToDocx(htmlString, fileName) {
    let params = {
      submission: {
        document: htmlString,
        title: fileName
      }
    };

    let deferred = $q.defer();
    this.$http.post(ServerUrl + '/submissions/convert-doc', params).then((response) => {
      deferred.resolve(response);
    }, (errors) => {
      deferred.reject(errors);
    });
    return deferred.promise;
  };

  /**
   * Posts submission and clears $localStorage values.
   * Redirects to 'thank you' view
   */
  postSubmission() {
    this.SubFactory.upsertSubmission(vm.submission).then((response) => {
      this.resetSubmission();
      this.$state.go('main.submissions-thank-you');
    }, (response) => {
      console.log('error: ', response);
      angular.forEach(response.data, (obj, key) => {
        if (key === 'email_content') {
          toastr.error('Description ' + obj[0], 'Error');
        }
      });
    });
  };

  findFileIndexById(id) {
    for (let i = 0; i < this.submission.attachments.length; i++) {
      if (this.submission.attachments[i].id === id) {
        return i;
      }
    }
  }
}
