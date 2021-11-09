<template>
  <div class="permissions__row">
    <div class="permissions__col">
      {{ title(id) }}
    </div>
    <div class="permissions__col">
      <AdminSwitcher v-model="read" />
    </div>
    <div class="permissions__col">
      <AdminSwitcher v-model="edit" />
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useAdminEditForm } from '@/use/forms/admin/edit'

import AdminSwitcher from '@/components/admin/ui/AdminSwitcher'

export default {
  name: 'AdminPermissionsItem',
  components: { AdminSwitcher },
  props: {
    id: String,
    item: Object
  },
  //emits: ['update:read', 'update:edit'],
  setup(props) {
    const read = ref(props.item.read)
    const edit = ref(props.item.edit)

    const { item, isSaveEnabled } = useAdminEditForm('users')

    const titles = {
      contacts: 'Контакты',
      events: 'Афиша',
      greetings: 'Приветствия',
      partners: 'Партнеры',
      settings: 'Настройки',
      socials: 'Соцсети',
      users: 'Пользователи'
    }

    const title = id => titles[id] || ''

    watch([read, edit], ([read, edit], [prevRead, prevEdit]) => {
      if (read !== prevRead) {
        item.value.permissions[props.id].read = read
      }

      if (edit !== prevEdit) {
        item.value.permissions[props.id].edit = edit
      }

      isSaveEnabled.value = true
    })

    return {
      title,
      read,
      edit
    }
  }
}
</script>

<style lang="scss"></style>
