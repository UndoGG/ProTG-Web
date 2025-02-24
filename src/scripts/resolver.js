export function resolveStatusName(status_int) {
  switch (status_int) {
    case 1:
      return 'В очереди'
    case 2:
      return 'В работе'
    case 3:
      return 'Исполнен'
    case 4:
      return 'Провален'
    case 5:
      return 'Ни одна отправка не удалась'
    case 6:
      return 'Недостаточно средств'
    case 7:
      return 'Ошибка безопасности'
    case 8:
      return 'Группа не найдена'
    case 9:
      return 'Поиск исполнителя'
    default:
      return 'Неизвестно'
  }
}

export function resolveStatusStyle(status_int) {
  let color = null
  switch (status_int) {
    case 1:
      color = '#c26528'
      break
    case 2:
      color = '#3466ff'
      break
    case 3:
      color = 'green'
      break
    case 4:
      color = '#a21a1a'
      break
    case 5:
      color = '#a21a1a'
      break
    case 6:
      color = '#a21a1a'
      break
    case 7:
      color = '#000000'
      break
    case 8:
      color = '#a21a1a'
      break
    case 9:
      color = '#c2462c'
      break
    default:
      color = 'purple'
  }
  return {"background-color": color}
}

export function resolveInvoiceStatusStyle(status_int) {
  let color = null
  switch (status_int) {
    case 1:
      color = '#c26528'
      break
    case 2:
      color = 'green'
      break
    default:
      color = 'purple'
  }
  return {"background-color": color}
}


export function resolveInvoiceStatusName(status_int) {
  switch (status_int) {
    case 1:
      return 'Создан'
    case 2:
      return 'Оплачен'
    default:
      return 'Неизвестно'
  }
}