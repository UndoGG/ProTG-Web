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

export function resolveStatusName(status_int) {
  switch (status_int) {
    case 1:
      return 'Создан'
    case 2:
      return 'Поиск исполнителя'
    case 3:
      return 'В работе'
    case 4:
      return 'Исполнен'
    case 5:
      return 'Провален'
    case 6:
      return 'Ни одна отправка не удалась'
    case 7:
      return 'Недостаточно средств'
    case 8:
      return 'Ошибка безопасности'
    case 9:
      return 'Группа не найдена'
    default:
      return 'Неизвестно'
  }
}

export function resolveStatusStyle(status_int) {
  let color = null
  switch (status_int) {
    case 1:
      color = '#328071'
      break
    case 2:
      color = '#c26528'
      break
    case 3:
      color = '#3466ff'
      break
    case 4:
      color = 'green'
      break
    case 5:
      color = '#a21a1a'
      break
    case 6:
      color = '#a21a1a'
      break
    case 7:
      color = '#a21a1a'
      break
    case 8:
      color = '#000000'
      break
    case 9:
      color = '#a21a1a'
      break
    default:
      color = 'purple'
  }
  return {"background-color": color}
}