import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { manageStoreHooks } from '@/utils/store/hooks'
import { deepEqual } from '@/utils/object'

const requiredKeys = {
  events: ['title', 'place', 'minPrice', 'date', 'url'],
  contacts: ['category', 'value'],
  partners: ['title', 'url'],
  socials: ['title', 'url'],
  users: ['name', 'email', 'password']
}

export const useAdminEditForm = module => {
  const route = useRoute()
  const router = useRouter()

  const { get, add, update, remove } = manageStoreHooks(module)

  const { id: routeId } = route.params

  const item = ref({
    ...get(routeId)
  })

  const initial = JSON.parse(JSON.stringify(get(routeId)))

  const isSaveEnabled = ref()

  const required = requiredKeys[module] || []

  watch(
    item,
    () => {
      let check = false

      for (const [key, value] of Object.entries(item.value)) {
        if (typeof value === 'object') {
          check = check || !deepEqual(value, initial[key])
        } else {
          check = check || initial[key] !== value
        }
      }

      required.forEach(key => {
        check = check && item.value[key]
      })

      isSaveEnabled.value = check
    },
    {
      deep: true
    }
  )

  const back = () => router.go(-1)

  const onSave = async () => {
    const { id } = item.value

    isSaveEnabled.value = false

    if (id) {
      await update(item.value)
    } else {
      await add(item.value)
    }

    isSaveEnabled.value = true

    back()
  }

  const onRemove = async () => {
    const { id } = item.value

    await remove(id)

    back()
  }

  const onCancel = () => {
    back()
  }

  const onThumbUpload = async url => {
    item.value.thumb = url

    if (item.value.id) {
      await update({
        ...item.value,
        thumb: url
      })
    }
  }

  const onThumbRemove = async () => {
    item.value.thumb = ''

    if (item.value.id) {
      await update({
        ...item.value,
        thumb: ''
      })
    }
  }

  return {
    item,
    isSaveEnabled,
    onSave,
    onRemove,
    onCancel,
    onThumbUpload,
    onThumbRemove
  }
}
