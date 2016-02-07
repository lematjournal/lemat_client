import { Component, View } from 'a1atscript';

@Component({
  appInjector: ['$scope'],
  selector: 'lemat-submission-upload',
  properties: {
    'submission' : 'submission'
  }
})
@View({
  templateUrl: './scripts/components/submissions/submissions.form/upload/upload.html'
})
export default class SubmissionsUpload {
  constructor($scope) {
    this.$scope = $scope;
  }

  /**
   * Clears all attachments, if there are images present in the attachment array
   * it will delete their corresponding Rails SQL entry.
   * Resets dom and attachment array.
   */
  clearAttachments() {
    if (this.submission.attachments.length === 0) return;
    for (let i = 0; this.submission.attachments.length > i; i += 1) {
      if (this.submission.attachments[i].image_url) {
        let image = this.submission.attachments[i].image_url;
        this.AS3Factory.deleteFile(image);
      } else {
        let attachment = this.submission.attachments[i];
        this.AS3Factory.deleteFile(attachment);
      }
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
      if ((/\.(gif|jpg|jpeg|tiff|png)$/i).test(attachment.image_url)) {
        await this.AS3Factory.deleteFile(attachment.image_url);
        await this.ImagesFactory.deleteImage(attachment.id);
        await this.submission.attachments.splice(this.findFileIndexById(attachment.id), 1);
      } else {
        this.AS3Factory.deleteFile(attachment);
      }
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
   * Takes html stored in 'this.doc' and generates a file blob to post to Amazon S3.
   * There is only one document attachment allowed so the method searches for any other
   * '.docx' files in the attachment array and replaces them with the new file
   */
  async uploadDoc() {
    try {
      let fileName = this.submission.title + '-' + this.submission.user.username + '-' + Date.now().toString() + '.docx';
      let response = await this.convertHtmlToDocx(this.doc, fileName);
      let s3Path = response.data;
      if (this.submission.attachments && this.$filter('filterDocs')(this.submission.attachments).length === 0) {
        this.submission.attachments.push(s3Path);
      } else {
        for (let i = 0; this.submission.attachments.length > i; i++) {
          if (!(/\.(gif|jpg|jpeg|tiff|png)$/i).test(this.submission.attachments[i])) {
            this.submission.attachments[i] = s3Path;
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
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
  uploadFile() {
    // check and see if the file is an image
    if ((/\.(gif|jpg|jpeg|tiff|png)$/i).test(this.attachment)) {
      let image = {
        image_url: this.attachment
      };
      this.ImagesFactory.uploadImage(image);
      this.submission.attachments.push(image);
      // if it isn't then check if there is a document in the attachment array
    } else {
      // if there isn't a document then push to array
      if ($filter('filterDocs')(this.submission.attachments).length === 0) {
        this.submission.attachments.push(this.attachment);
        // if there is then find it in the array and replace it
      } else {
        for (let i = 0; this.submission.attachments.length > i; i++) {
          if (!(/\.(gif|jpg|jpeg|tiff|png)$/i).test(this.submission.attachments[i])) {
            this.submission.attachments[i] = this.attachment;
          }
        }
      }
      console.log('', 'Generating Preview...');
      this.convertDocxToHtml();
    }
  }
}
