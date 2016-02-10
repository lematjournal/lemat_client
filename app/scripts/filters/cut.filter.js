import { Pipe } from 'ng-forward';

@Pipe()
export default class Cut {
  transform(value, wordwise, max, tail) {
    // method signature: "item | cut:true:500"
    if (!value) {
      return '';
    }

    max = parseInt(max, 10);
    if (!max) {
      return value;
    }
    if (value.length <= max) {
      return value;
    }
    value = value.substr(0, max);
    if (wordwise) {
      let lastspace = value.lastIndexOf(' ');
      if (lastspace !== -1) {
        value = value.substr(0, lastspace);
      }
    }

    return value + (tail || '…');
  }
}
