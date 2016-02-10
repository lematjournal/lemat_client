import { Component, Inject, Input } from 'ng-forward';
import 'reflect-metadata';

@Component({
  controllerAs: 'vm',
  selector: 'lemat-submission-info',
  templateUrl: './scripts/components/submissions/submissions.form/info/info.html',
  inputs: ['submission', 'state']
})

export default class SubmissionsInfo {
  @Input() submission;
  @Input() state;
  constructor() {
    this.menu = [
      ['bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript'],
      ['format-block'],
      ['font'],
      ['font-size'],
      ['font-color', 'hilite-color'],
      ['remove-format'],
      ['ordered-list', 'unordered-list', 'outdent', 'indent'],
      ['left-justify', 'center-justify', 'right-justify'],
      ['code', 'quote', 'paragraph'],
      ['link', 'image']
    ];
  }
}
