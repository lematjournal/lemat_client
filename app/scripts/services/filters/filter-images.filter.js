'use strict';

export default function filterImages(attachments) {
  var filtered = [];
  angular.forEach(attachments, function(item) {
    if (item.image_url) {
      filtered.push(item);
    }
  });
  return filtered;
}
