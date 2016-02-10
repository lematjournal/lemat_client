import { Component, Input } from 'ng-forward';
import SubmissionsFactory from '../../submissions.factory';
import ToTrusted from '../../../../filters/to-trusted.filter';
import 'babel-polyfill';

@Component({
  controllerAs: 'vm',
  providers: [SubmissionsFactory],
  pipes: [ToTrusted],
  selector: 'lemat-submission-review',
  templateUrl: './scripts/components/submissions/submissions.form/review/review.html',
  inputs: ['submission']
})
export default class SubmissionsReview {
  @Input() submission;
  constructor(SubmissionsFactory) {
    this.SubmissionsFactory = SubmissionsFactory;
  }

  isDoc(url) {
    return (/\.(doc|docx)$/i).test(url);
  }

  isImage(url) {
    return (/\.(gif|jpg|jpeg|tiff|png)$/i).test(url);
  }

  /**
   * Sends '.docx' attachment url to the back-end where it is retrieved and converted to html
   * @returns {Object} Promise containing a string of the converted html
   */
  async renderDoc(attachment) {
    try {
      let doc = await this.SubmissionsFactory.convertDocxToHtml(attachment.url);
      return doc;
    } catch (error) {
      console.error(error);
    }
  }
}
