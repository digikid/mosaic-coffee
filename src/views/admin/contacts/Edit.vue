<template>
  <AppSection title="Редактировать контакт" id="edit" back>
    <AdminContactsEdit />
  </AppSection>
</template>

<script>
import AppSection from '@/components/ui/AppSection'
import AdminContactsEdit from '@/components/admin/modules/contacts/AdminContactsEdit'

export default {
  name: 'Edit',
  components: { AdminContactsEdit, AppSection }
}
</script>

<style lang="scss"></style>
