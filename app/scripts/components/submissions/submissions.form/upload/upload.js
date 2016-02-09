import { Component, View } from 'a1atscript';

@Component({
  appInjector: ['$scope', 'AS3Factory'],
  selector: 'lemat-submission-upload',
  properties: {
    'submission' : 'submission'
  }
})
@View({
  templateUrl: './scripts/components/submissions/submissions.form/upload/upload.html'
})
export default class SubmissionsUpload {
  constructor($scope, AS3Factory) {
    this.$scope = $scope;
    this.AS3Factory = AS3Factory;
    this.file = {};
  }

  /**
   * Clears all attachments, if there are images present in the attachment array
   * it will delete their corresponding Rails SQL entry.
   * Resets dom and attachment array.
   */
  clearAttachments() {
    if (this.submission.attachments.length === 0) return;
    for (let i = 0; this.submission.attachments.length > i; i += 1) {
      let attachment = this.submission.attachments[i];
      this.AS3Factory.deleteFile(attachment.key);
    }
    this.$scope.$parent.$storage.submission.attachments = [];
    this.submission.attachments = this.$scope.$parent.$storage.submission.attachments;
  }

  /**
   * Takes an attachment as an argument. Checks to see if it is an image,
   * if its an image it deletes the Amazon S3 file and corresponding entry in the Rails database.
   * Since documents aren't stored, they are simply deleted from Amazon S3
   * @summary Deletes an attachment
   * @param {Object} attachment
   */
  async deleteFile(attachment) {
    try {
      await this.AS3Factory.deleteFile(attachment);
      this.submission.attachments.splice(this.findFileIndexById(attachment.id), 1);
    } catch (error) {
      console.error(error);
    }
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
    console.log('', 'Video submitted');
  }

  /**
   * Utility method to clear all attachments by resetting local storage.
   */
  resetAttachments() {
    this.$scope.$storage.submission.attachments = [];
    this.submission.attachments = this.$scope.$storage.submission.attachments;
  }

  /**
   * Uploads a document or image file.
   * If its a document it converts it html.
   * Note: this is dropped into the fileSelect directive
   */
  async uploadFile(file, folder) {
    try {
      let response = await this.AS3Factory.upload(file, folder);
      this.submission.attachments.push(response.data);
      this.$scope.$digest();
    } catch (error) {
      console.error(error);
    }
  }
}
