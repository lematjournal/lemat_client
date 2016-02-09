import { Component, View } from 'a1atscript';

@Component({
  selector: 'lemat-submission-review',
  properties: {
    'submission' : 'submission'
  }
})
@View({
  templateUrl: './scripts/components/submissions/submissions.form/review/review.html'
})
export default class SubmissionsReview {
  constructor() {
    console.log(this);
  }
}
