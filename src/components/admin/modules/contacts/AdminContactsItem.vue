<template>
  <tr :class="!item.active ? 'is-inactive' : null">
    <td>{{ index + 1 }}</td>
    <td>
      <a href="#" @click.prevent="edit(item.id)">
        {{ title(item.category) }}
      </a>
    </td>
    <td>
      <a href="#" @click.prevent="edit(item.id)">{{ item.value }}</a>
    </td>
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
import { useContacts } from '@/use/store/contacts'

import AdminSwitcher from '@/components/admin/ui/AdminSwitcher'
import AdminAction from '@/components/admin/ui/AdminAction'

export default {
  name: 'AdminContactsItem',
  components: { AdminSwitcher, AdminAction },
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
    const { categories, update, remove, edit } = useContacts()

    const activeValue = ref(props.item.active)

    const title = category => {
      const item = categories.value.find(({ value }) => value === category)

      return item ? item.title : ''
    }

    watch(activeValue, async value => {
      const { item } = props

      await update({
        ...item,
        active: value
      })
    })

    return {
      title,
      activeValue,
      edit,
      remove
    }
  }
}
</script>
