import { Pipe } from 'ng-forward';

@Pipe()
export default class SplitCharacters {
  transform(input, chars) {
    if (isNaN(chars)) return input;
    if (chars <= 0) return '';
    if (input && input.length > chars) {
      let prefix = input.substring(0, chars / 2);
      let postfix = input.substring(input.length - chars / 2, input.length);
      return prefix + '...' + postfix;
    }
    return input;
  }
}
