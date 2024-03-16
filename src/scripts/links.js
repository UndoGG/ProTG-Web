export function openLink(link, blank = true) {
  if (blank) {
    window.open(link, '_blank');
  } else {
    window.location.href = link;
  }
    }
