<template>
  <AdminSection title="Пользователи" id="users">
    <template #default="{ limit, searchQuery }">
      <AdminUsersList :limit="limit" :searchQuery="searchQuery" />
    </template>
    <template #actions>
      <AppButton color="green" text="+ Добавить" @click="create" />
    </template>
  </AdminSection>
</template>

<script>
import { useUsers } from '@/use/store/users'

import AdminSection from '@/components/admin/ui/AdminSection'
import AppButton from '@/components/ui/AppButton'
import AdminUsersList from '@/components/admin/modules/users/AdminUsersList'

export default {
  name: 'Users',
  components: {
    AdminUsersList,
    AppButton,
    AdminSection
  },
  setup() {
    const { create } = useUsers()

    return {
      create
    }
  }
}
</script>
