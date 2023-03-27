export const isValidTimeString = str =>
  /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(str)

export const parseTimeString = (str, divider = ':') => {
  return str.split(divider).map(value => Number(value.trim()) || 0)
}

export const toTimeString = (value, divider = ':') => {
  const parts = []

  if (typeof value === 'string') {
    if (value.includes(divider)) {
      const [hours, minutes] = parseTimeString(value, divider)

      if (hours && hours < 24) {
        parts.push(hours)

        if (!minutes || minutes > 60) {
          parts.push(0)
        }
      }

      if (minutes && minutes < 60) {
        if (!parts.length) {
          parts.push(0)
        }

        parts.push(minutes)
      }
    } else {
      const parsed = parseInt(value)

      if (!Number.isNaN(parsed) && parsed < 24) {
        parts.push(parsed)
        parts.push(0)
      }
    }
  }

  if (typeof value === 'number' && value < 24) {
    parts.push(value)
    parts.push(0)
  }

  if (parts.length) {
    return parts.map(part => part.toString().padStart(2, '0')).join(divider)
  }

  return ''
}

export const toCompactTimeString = (str, divider = ':') => {
  const [hours, minutes] = parseTimeString(str, divider)
  const parts = []

  if (hours && hours < 24) {
    parts.push(hours)
  }

  if (minutes && minutes < 60) {
    if (!parts.length) {
      parts.push(0)
    }

    parts.push(minutes)
  }

  if (parts.length) {
    return parts.join(divider)
  }

  return ''
}

export const isPeriodCurrent = (start, end, divider = ':') => {
  if (start || end) {
    const now = new Date()
    const startDate = new Date()
    const endDate = new Date()

    if (start) {
      const [startHours, startMinutes] =
        typeof start === 'string' ? parseTimeString(start, divider) : start

      startDate.setHours(startHours)
      startDate.setMinutes(startMinutes)

      if (startDate > now) {
        return false
      }
    }

    if (end) {
      const [endHours, endMinutes] =
        typeof end === 'string' ? parseTimeString(end, divider) : end

      endDate.setHours(endHours)
      endDate.setMinutes(endMinutes)

      if (now > endDate) {
        return false
      }
    }
  }

  return true
}
