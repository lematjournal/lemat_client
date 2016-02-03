'use strict';

export default function spaceless() {
  return function(input) {
    if (input) {
      return input.replace(/[()&<>"'\/]/g, '').replace(/\s+/g, '-');
    }
  };
}
