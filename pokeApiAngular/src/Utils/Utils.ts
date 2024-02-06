export function NoEndOfLines(string:string) {
    return string.replaceAll(/[\n\f]/g, " ");
  }