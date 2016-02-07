import { Component, View } from 'a1atscript';

@Component({
  selector: 'lemat-submission-info',
  properties: {
    'submission' : 'submission'
  }
})
@View({
  templateUrl: './scripts/components/submissions/submissions.form/info/info.html'
})
export default class SubmissionsInfo {
  constructor() {}
}
