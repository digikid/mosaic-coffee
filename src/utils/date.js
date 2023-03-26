const DATE_FORMAT = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
}

const DAYS = [
  'воскресенье',
  'понедельник',
  'вторник',
  'среда',
  'четверг',
  'пятница',
  'суббота'
]

const MONTHS = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря'
]

export const getTimestamp = () => new Date().toISOString()

export const getDay = date => date.getDate()
export const getYear = date => date.getFullYear()
export const getMonth = date => MONTHS[date.getMonth()]
export const getWeekday = date => DAYS[date.getDay()]

export const getRawDate = str => {
  if (!str) return null

  if (Object.prototype.toString.call(str) === '[object Date]') {
    return str
  }

  return new Date(JSON.parse(str).replace(/"/g, ''))
}

export const getLocaleDate = (date, params) => {
  if (!getRawDate(date)) return null

  return getRawDate(date).toLocaleString('ru-RU', params || DATE_FORMAT)
}

export const getSeparatedDate = date => {
  const _date = getRawDate(date)

  const result = {
    day: null,
    month: null,
    year: null,
    weekday: null
  }

  if (_date) {
    result.day = getDay(_date)
    result.month = getMonth(_date)
    result.year = getYear(_date)
    result.weekday = getWeekday(_date)
  }

  return result
}
