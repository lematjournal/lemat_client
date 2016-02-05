export default function filterDocs() {
  return function(attachments) {
    attachments = attachments.filter((item) => {
      if (!item.image_url) {
        filtered.push(item);
      }
    });
    return attachments;
  };
}
