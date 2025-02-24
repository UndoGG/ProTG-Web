export function getResult(text) {
  // Создаем новый Blob объект с указанным текстом и MIME-типом
  const blob = new Blob([text], { type: 'text/plain' });

  // Создаем ссылку для объекта Blob
  const url = URL.createObjectURL(blob);

  // Создаем ссылку для скачивания файла
  const link = document.createElement('a');
  link.href = url;
  link.download = 'result.txt';

  // Добавляем ссылку на страницу и эмулируем клик для скачивания файла
  document.body.appendChild(link);
  link.click();

  // Очищаем ссылку и объект Blob после завершения скачивания
  URL.revokeObjectURL(url);
  document.body.removeChild(link);
}