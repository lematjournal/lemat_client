'use strict';

export default function escapeHtml() {
  var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;'
  };

  return function(str) {
    return String(str).replace(/[&<>"'\/]/g, function(s) {
      return entityMap[s];
    });
  };
}