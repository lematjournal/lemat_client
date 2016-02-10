import { Pipe } from 'ng-forward';

@Pipe()
export default class NewLines {
  transform(text) {
    if (text) {
      return text.replace(/(\r\n|\n|\r)/gm, "");
    }
  }
}
