export default function taOptions() {
  'ngInject';
  return ($provide) => {
    $provide.decorator('taOptions', ['taRegisterTool', '$delegate', (taRegisterTool, taOptions) => { // $delegate is the taOptions we are decorating
        taOptions.toolbar = [
          ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre'],
          // ['bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo', 'clear'],
          // ['justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent'],
          ['html', 'insertImage', 'insertLink']
        ]
        return taOptions;
      }]);
    }
  }
