<template>
  <AdminSection title="Контакты" id="contacts">
    <template #default="{ limit, searchQuery }">
      <AdminContactsList :limit="limit" :searchQuery="searchQuery" />
    </template>
    <template #actions>
      <AppButton color="green" text="+ Добавить" @click="create" />
    </template>
  </AdminSection>
</template>

<script>
import { useContacts } from '@/use/store/contacts'

import AdminSection from '@/components/admin/ui/AdminSection'
import AppButton from '@/components/ui/AppButton'
import AdminContactsList from '@/components/admin/modules/contacts/AdminContactsList'

export default {
  name: 'Contacts',
  components: {
    AdminContactsList,
    AppButton,
    AdminSection
  },
  setup() {
    const { create } = useContacts()

    return {
      create
    }
  }
}
</script>
