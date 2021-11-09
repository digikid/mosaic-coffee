<template>
  <AppSection title="Добавить контакт" id="add" back>
    <AdminContactsEdit />
  </AppSection>
</template>

<script>
import AppSection from '@/components/ui/AppSection'
import AdminContactsEdit from '@/components/admin/modules/contacts/AdminContactsEdit'

export default {
  name: 'Add',
  components: { AdminContactsEdit, AppSection }
}
</script>

<style lang="scss"></style>
