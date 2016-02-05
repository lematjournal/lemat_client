'use strict';

export default function thumbnail() {
  return function(input) {
    console.log(input.match('watch'), input.replace(/https(.*)watch\?v=/, 'http://img.youtube.com/vi/'))
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
