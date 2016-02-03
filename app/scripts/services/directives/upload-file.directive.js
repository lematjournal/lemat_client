'use strict';

export default function uploadfile() {
  var directive = {
    restrict: 'A',
    link: link
  };

  return directive;

  function link(scope, element) {
    element.bind('click', function(element) {
      angular.element(element.target).siblings('#upload').trigger('click');
    });
  }
}
