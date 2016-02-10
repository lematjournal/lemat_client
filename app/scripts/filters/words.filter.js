import { Pipe } from 'ng-forward';

@Pipe()
export default class Words {
  transform(input, words) {
    if (isNaN(words)) return input;
    if (words <= 0) return '';
    if (input) {
      let inputWords = input.split(/\s+/);
      if (inputWords.length > words) {
        input = inputWords.slice(0, words).join(' ') + '…';
      }
    }
    return input;
  }
}
