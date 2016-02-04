export default function uiSrefIf() {
  'ngInject';
  return function($compile) {
    let directive = {
      scope: {
        val: '@uiSrefVal',
        if: '=uiSrefIf'
      },
      link: link
    };

    return directive;
    'ngInject';
    function link(scope, element, attrs) {
      element.removeAttr('ui-sref-if');
      $compile(element)(scope);
      scope.$watch('if', function(bool) {
        if (bool) {
          element.attr('ui-sref', scope.val);
        } else {
          element.removeAttr('ui-sref');
          element.removeAttr('href');
        }
        $compile(element)(scope);
      });
    }
  }
}
