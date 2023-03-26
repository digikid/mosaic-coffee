<template>
  <AdminSection title="Редактировать пользователя" id="edit" back>
    <AdminUsersEdit />
  </AdminSection>
</template>

<script>
import AdminSection from '@/components/admin/ui/AdminSection'
import AdminUsersEdit from '@/components/admin/modules/users/AdminUsersEdit'

export default {
  name: 'Edit',
  components: { AdminUsersEdit, AdminSection }
}
</script>
