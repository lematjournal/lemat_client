'use strict';

export default function filterDocs() {
  return function(attachments) {
    var filtered = [];
    angular.forEach(attachments, function(item) {
      if (!item.image_url) {
        filtered.push(item);
      }
    });
    return filtered;
  };
}
