'use strict';

export default function filterDocs() {
  return function(attachments) {
    let filtered = [];
    attachments.map((item) => {
      if (!item.image_url) {
        filtered.push(item);
      }
    });
    return filtered;
  };
}
