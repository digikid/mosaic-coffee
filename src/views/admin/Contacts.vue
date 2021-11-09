<template>
  <AppSection title="Контакты" id="contacts">
    <AdminContactsList />
    <template #actions>
      <AppButton color="green" text="+ Добавить" @click="create" />
    </template>
  </AppSection>
</template>

<script>
import { useContacts } from '@/use/store/contacts'

import AppSection from '@/components/ui/AppSection'
import AppButton from '@/components/ui/AppButton'
import AdminContactsList from '@/components/admin/modules/contacts/AdminContactsList'

export default {
  name: 'Contacts',
  components: { AdminContactsList, AppButton, AppSection },
  setup() {
    const { create } = useContacts()

    return {
      create
    }
  }
}
</script>

<style lang="scss"></style>
