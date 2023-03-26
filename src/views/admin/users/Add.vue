<template>
  <AdminSection title="Добавить пользователя" id="add" back>
    <AdminUsersEdit />
  </AdminSection>
</template>

<script>
import AdminSection from '@/components/admin/ui/AdminSection'
import AdminUsersEdit from '@/components/admin/modules/users/AdminUsersEdit'

export default {
  name: 'Add',
  components: { AdminUsersEdit, AdminSection }
}
</script>
