<template>
  <AppSection title="Редактировать пользователя" id="edit" back>
    <AdminUsersEdit />
  </AppSection>
</template>

<script>
import AppSection from '@/components/ui/AppSection'
import AdminUsersEdit from '@/components/admin/modules/users/AdminUsersEdit'

export default {
  name: 'Edit',
  components: { AdminUsersEdit, AppSection }
}
</script>

<style lang="scss"></style>
