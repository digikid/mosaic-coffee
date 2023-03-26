<template>
  <AdminSection title="Добавить контакт" id="add" back>
    <AdminContactsEdit />
  </AdminSection>
</template>

<script>
import AdminSection from '@/components/admin/ui/AdminSection'
import AdminContactsEdit from '@/components/admin/modules/contacts/AdminContactsEdit'

export default {
  name: 'Add',
  components: { AdminContactsEdit, AdminSection }
}
</script>
