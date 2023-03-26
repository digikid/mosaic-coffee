<template>
  <tr :class="!item.active || !isActual(item.date) ? 'is-inactive' : null">
    <td>{{ index + 1 }}</td>
    <td>
      <AdminThumb :src="item.thumb || item.thumbUrl" :title="item.title" />
    </td>
    <td>
      <a href="#" @click.prevent="edit(item.id)">
        {{ item.title }}
      </a>
    </td>
    <td>{{ getLocaleDate(item.date) }}</td>
    <td>{{ item.place }}</td>
    <td>
      <AdminSwitcher v-model="activeValue" />
    </td>
    <td>
      <AdminAction icon="edit" @click.stop="edit(item.id)" />
      <AdminAction icon="remove" @click.stop="remove(item.id)" />
    </td>
  </tr>
</template>

<script>
import { ref, watch } from 'vue'
import { useEvents } from '@/use/store/events'
import { getLocaleDate } from '@/utils/date'

import AdminAction from '@/components/admin/ui/AdminAction'
import AdminSwitcher from '@/components/admin/ui/AdminSwitcher'
import AdminThumb from '@/components/admin/ui/AdminThumb'

export default {
  name: 'AdminEventsItem',
  components: { AdminThumb, AdminSwitcher, AdminAction },
  props: {
    item: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const { isActual, update, remove, edit } = useEvents()

    const activeValue = ref(props.item.active)

    watch(activeValue, async value => {
      const { item } = props

      await update({
        ...item,
        active: value
      })
    })

    return {
      activeValue,
      isActual,
      getLocaleDate,
      edit,
      remove
    }
  }
}
</script>
