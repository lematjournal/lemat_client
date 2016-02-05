export default function newLines() {
  return function(text) {
    if (text) {
      return text.replace(/(\r\n|\n|\r)/gm, "");
    }
  };
}
