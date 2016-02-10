import { Pipe } from 'ng-forward';

const entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;'
};

@Pipe()
export default class EscapeHtml {
  transform(str) {
    return String(str).replace(/[&<>"'\/]/g, (s) => {
      return entityMap[s];
    });
  }
}
