import { Pipe } from 'ng-forward';

@Pipe()
export default class Thumbnail {
  transform(input) {
    if (input.match('watch')) {
      input = input.replace(/https(.*)watch\?v=/, 'http://img.youtube.com/vi/');
      input += '/hqdefault.jpg';
    } else {
      input = input.replace(/https(.*)embed\//, 'http://img.youtube.com/vi/');
      input += '/hqdefault.jpg';
    }
    return input;
  }
}
