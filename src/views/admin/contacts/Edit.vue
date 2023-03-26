<template>
  <AdminSection title="Редактировать контакт" id="edit" back>
    <AdminContactsEdit />
  </AdminSection>
</template>

<script>
import AdminSection from '@/components/admin/ui/AdminSection'
import AdminContactsEdit from '@/components/admin/modules/contacts/AdminContactsEdit'

export default {
  name: 'Edit',
  components: { AdminContactsEdit, AdminSection }
}
</script>
