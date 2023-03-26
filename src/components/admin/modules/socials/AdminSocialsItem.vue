<template>
  <tr :class="!item.active ? 'is-inactive' : null">
    <td>{{ index + 1 }}</td>
    <td>
      <AdminThumb
        :src="item.thumb || item.thumbUrl"
        :title="item.title"
        transparent
      />
    </td>
    <td>
      <a href="#" @click.prevent="edit(item.id)">
        {{ item.title }}
      </a>
    </td>
    <td>
      <a target="_blank" :href="item.url">
        {{ item.url }}
      </a>
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
import { useSocials } from '@/use/store/socials'

import AdminThumb from '@/components/admin/ui/AdminThumb'
import AdminSwitcher from '@/components/admin/ui/AdminSwitcher'
import AdminAction from '@/components/admin/ui/AdminAction'

export default {
  name: 'AdminSocialsItem',
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
    const { update, remove, edit } = useSocials()

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
      edit,
      remove
    }
  }
}
</script>
