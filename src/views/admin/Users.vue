<template>
  <AppSection title="Пользователи" id="users">
    <AdminUsersList />
    <template #actions>
      <AppButton color="green" text="+ Добавить" @click="create" />
    </template>
  </AppSection>
</template>

<script>
import { useUsers } from '@/use/store/users'

import AppSection from '@/components/ui/AppSection'
import AppButton from '@/components/ui/AppButton'
import AdminUsersList from '@/components/admin/modules/users/AdminUsersList'

export default {
  name: 'Users',
  components: { AdminUsersList, AppButton, AppSection },
  setup() {
    const { create } = useUsers()

    return {
      create
    }
  }
}
</script>

<style lang="css"></style>
