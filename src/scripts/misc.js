export function isInt(value) {
  let x = parseFloat(value);
  return !isNaN(value) && (x | 0) === x;
}

export function highlightBorder(element) {
  let initial = element.style.borderColor
  element.style.borderColor = 'red'
  setTimeout(() => {
    element.style.borderColor = initial
  }, 500)
}

export async function copy(text) {
  try {
      await navigator.clipboard.writeText(text);
    } catch($e) {
      alert(`Unable to copy text ${text}`);
    }
}

export function formatDate(inputDate) {
  const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
