export const isValidTimeString = str =>
  /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(str)

export const parseTimeString = (str, divider = ':') => {
  const [rawHours, rawMinutes] = str.split(divider)

  return [rawHours, rawMinutes].map(value => Number(value) || 0)
}

export const isPeriodCurrent = (start, end) => {
  if (start || end) {
    const now = new Date()
    const startDate = new Date()
    const endDate = new Date()

    if (start) {
      const [startHours, startMinutes] =
        typeof start === 'string' ? parseTimeString(start) : start

      startDate.setHours(startHours)
      startDate.setMinutes(startMinutes)

      if (startDate > now) {
        return false
      }
    }

    if (end) {
      const [endHours, endMinutes] =
        typeof end === 'string' ? parseTimeString(end) : end

      endDate.setHours(endHours)
      endDate.setMinutes(endMinutes)

      if (now > endDate) {
        return false
      }
    }
  }

  return true
}
