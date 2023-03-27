import { computed } from 'vue'
import { manageStoreHooks } from '@/utils/store/hooks'
import { randomNumber } from '@/utils/random'
import {
  isPeriodCurrent,
  toTimeString,
  toCompactTimeString
} from '@/utils/time'
import { download } from '@/utils/fs'
import { getFirebaseUid } from '@/utils/api'

export const useGreetings = () => {
  const storeHooks = manageStoreHooks('greetings')

  const { items, empty, removeAll, add, load } = storeHooks

  const published = computed(() => {
    return [...items.value].filter(
      item => item.active && isPeriodCurrent(item.startTime, item.endTime)
    )
  })

  const random = computed(() => {
    const total = published.value.length

    if (total) {
      const index = randomNumber(0, total - 1) || 0

      if (published.value[index]) {
        return published.value[index].text
      }
    }

    return ''
  })

  const downloadFile = () => {
    const data = [...items.value]
      .map(({ text, startTime, endTime }) => {
        let str = text
          .replace(/(\r\n|\n|\r)/gm, ' ')
          .replace(/ +(?= )/g, '')
          .trim()

        if (startTime) {
          str += `#${toCompactTimeString(startTime)}`
        }

        if (endTime) {
          str += `#${toCompactTimeString(endTime)}`
        }

        return str
      })
      .join('\n')

    download('greetings.txt', data)
  }

  const loadFromFile = async data => {
    const items = data
      .split('\n')
      .filter(str => Boolean(str.trim()))
      .map(str => {
        const [text, rawStartTime, rawEndTime] = str
          .trim()
          .replace(/(\r\n|\n|\r)/gm, ' ')
          .replace(/ +(?= )/g, '')
          .split('#')

        const item = {
          ...empty.value,
          id: getFirebaseUid(),
          text
        }

        if (rawStartTime) {
          item.startTime = toTimeString(rawStartTime)
        }

        if (rawEndTime) {
          item.endTime = toTimeString(rawEndTime)
        }

        return item
      })

    await removeAll(true)

    if (items.length) {
      await add(items)
      await load()
    }
  }

  return {
    ...storeHooks,
    published,
    random,
    downloadFile,
    loadFromFile
  }
}
