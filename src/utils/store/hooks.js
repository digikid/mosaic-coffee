import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import { useStorage } from '@/use/storage/storage'

export const manageStoreHooks = module => {
  const store = useStore()
  const router = useRouter()

  const { remove: removeThumb } = useStorage()

  const items = computed(() => store.getters[`${module}/items`])
  const empty = computed(() => store.getters[`${module}/empty`])

  const published = computed(() =>
    items.value ? items.value.filter(item => item.active) : []
  )

  const load = async () => await store.dispatch(`${module}/load`)
  const add = async item => await store.dispatch(`${module}/add`, item)
  const update = async item => await store.dispatch(`${module}/update`, item)

  const remove = async id => {
    const item = get(id)

    if (item.thumb) {
      await removeThumb(item.thumb)
    }

    await store.dispatch(`${module}/remove`, id)
  }

  const get = id => store.getters[`${module}/get`](id) || empty.value

  const edit = id => router.push(`/admin/${module}/${id}`)
  const create = () => router.push(`/admin/${module}/add`)

  return {
    items,
    empty,
    published,
    load,
    add,
    update,
    remove,
    get,
    edit,
    create
  }
}
