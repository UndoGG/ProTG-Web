export function isInt(value) {
  let x = parseFloat(value);
  return !isNaN(value) && (x | 0) === x;
}
