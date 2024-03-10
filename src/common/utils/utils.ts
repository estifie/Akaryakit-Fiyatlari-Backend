export function parseTextOrNumber(text: string): number | string {
  return isNaN(Number(text)) ? text : Number(text);
}
