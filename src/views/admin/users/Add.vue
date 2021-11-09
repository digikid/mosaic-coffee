<template>
  <AppSection title="Добавить пользователя" id="add" back>
    <AdminUsersEdit />
  </AppSection>
</template>

<script>
import AppSection from '@/components/ui/AppSection'
import AdminUsersEdit from '@/components/admin/modules/users/AdminUsersEdit'

export default {
  name: 'Add',
  components: { AdminUsersEdit, AppSection }
}
</script>

<style lang="scss"></style>
