export default function toTrusted ($sce) {
  "ngInject";
  return function(text) {
    return $sce.trustAsHtml(text);
  };
}
