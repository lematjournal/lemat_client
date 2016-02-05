export default function filterImages() {
  return function (attachments) {
    attachments = attachments.filter((item) => {
      if (item.image_url) {
        return item;
      }
    });
    return attachments;
  }
}
