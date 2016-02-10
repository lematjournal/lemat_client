import { Pipe } from 'ng-forward';

@Pipe()
export default class Spaceless {
  transform(input) {
    if (input) {
      return input.replace(/[()&<>"'\/]/g, '').replace(/\s+/g, '-');
    }
  }
}
