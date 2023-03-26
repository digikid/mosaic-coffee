<template>
  <AdminSection title="Партнеры" id="partners">
    <template #default="{ limit, searchQuery }">
      <AdminPartnersList :limit="limit" :searchQuery="searchQuery" />
    </template>
    <template #actions>
      <AppButton color="green" text="+ Добавить" @click="create" />
    </template>
  </AdminSection>
</template>

<script>
import { usePartners } from '@/use/store/partners'

import AdminSection from '@/components/admin/ui/AdminSection'
import AppButton from '@/components/ui/AppButton'
import AdminPartnersList from '@/components/admin/modules/partners/AdminPartnersList'

export default {
  name: 'Partners',
  components: {
    AdminPartnersList,
    AppButton,
    AdminSection
  },
  setup() {
    const { create } = usePartners()

    return {
      create
    }
  }
}
</script>
