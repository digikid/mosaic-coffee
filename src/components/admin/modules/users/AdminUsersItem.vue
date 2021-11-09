<template>
  <tr>
    <td>{{ index + 1 }}</td>
    <td>
      <AdminThumb :src="item.thumb || item.thumbUrl" />
    </td>
    <td>
      <a href="#" @click.prevent="edit(item.id)">
        {{ item.name }}
      </a>
    </td>
    <td>
      <a href="#" @click.prevent="edit(item.id)">
        {{ item.email }}
      </a>
    </td>
    <td>
      <AdminAction icon="edit" @click.stop="edit(item.id)" />
      <AdminAction icon="remove" @click.stop="remove(item.id)" />
    </td>
  </tr>
</template>

<script>
import { useUsers } from '@/use/store/users'

import AdminThumb from '@/components/admin/ui/AdminThumb'
import AdminAction from '@/components/admin/ui/AdminAction'

export default {
  name: 'AdminUsersItem',
  components: { AdminAction, AdminThumb },
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
  setup() {
    const { edit, remove } = useUsers()

    return {
      edit,
      remove
    }
  }
}
</script>

<style lang="scss"></style>
