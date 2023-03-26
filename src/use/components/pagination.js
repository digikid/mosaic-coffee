import { ref, computed, watch, toRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export function usePagination(items, props, range = 5) {
  const route = useRoute()
  const router = useRouter()

  const current = ref(route.query.page - 1 || 0)
  const previousPage = ref()

  const limit = toRef(props, 'limit')
  const searchQuery = toRef(props, 'searchQuery')
  const hasLimit = computed(() => limit.value !== -1)

  const filteredItems = computed(() => {
    if (searchQuery.value && items.value.length) {
      const query = searchQuery.value.toLowerCase()
      const excludedKeys = ['id', 'createDt', 'updateDt']
      const keys = Object.entries(items.value[0])
        .filter(
          ([key, value]) =>
            !excludedKeys.includes(key) && typeof value === 'string'
        )
        .reduce((acc, [key]) => [...acc, key], [])

      if (keys.length) {
        return items.value.filter(item => {
          return keys.some(key => item[key].toLowerCase().includes(query))
        })
      }
    }

    return items.value
  })

  const pages = computed(() =>
    filteredItems.value
      ? hasLimit.value
        ? filteredItems.value.reduce((acc, val, i) => {
            const index = Math.floor(i / limit.value)
            const page = acc[index] || (acc[index] = [])

            page.push(val)

            return acc
          }, [])
        : [filteredItems.value]
      : []
  )

  const links = computed(() => {
    if (!hasLimit.value) {
      return []
    }

    const curr = current.value
    const total = Math.ceil(filteredItems.value.length / limit.value)
    const step = range % 2 ? (range - 1) / 2 : range / 2

    let start = 0
    let end = total

    if (limit.value < filteredItems.value.length) {
      start = curr - step
      end = curr + step + 1

      if (curr < step) {
        end += step - curr
      }

      if (curr >= total - step) {
        start += -(step + curr - total + 1)
      }

      if (start < 0) {
        start = 0
      }

      if (end > total) {
        end = total
      }
    }

    return [...filteredItems.value].slice(start, end).map((item, i) => ({
      ...item,
      index: i + start
    }))
  })

  const index = i => (hasLimit.value ? current.value * limit.value + i : i)

  const to = i => {
    if (i < 0 || i >= pages.value.length) return

    setTimeout(() => {
      let query = {}

      if (route.query.title || route.query.category) {
        query = {
          ...route.query
        }

        delete query.page
      } else if (i) {
        query.page = i + 1
      }

      router.replace({
        query
      })
    }, 1)

    current.value = i

    if (pages.value.length - 1 > current.value) {
      previousPage.value = 0
    }
  }

  const prev = () => to(current.value - 1)

  const next = () => to(current.value + 1)

  watch(pages, () => {
    if (pages.value.length < current.value + 1 || !hasLimit.value) {
      previousPage.value = route.query.page ? route.query.page - 1 : 0

      to(0)
    }

    if (!pages.value.length || previousPage.value) {
      to(previousPage.value)
    }
  })

  return {
    pages,
    links,
    current,
    limit,
    index,
    to,
    prev,
    next
  }
}
