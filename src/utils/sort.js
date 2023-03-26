import { getRawDate } from '@/utils/date'

export const sortByDate = (arr, reverse) =>
  arr.sort(
    (a, b) => (reverse ? -1 : 1) * (getRawDate(b.date) - getRawDate(a.date))
  )
