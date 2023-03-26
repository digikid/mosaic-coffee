<template>
  <AdminSection title="Соцсети" id="socials">
    <template #default="{ limit, searchQuery }">
      <AdminSocialsList :limit="limit" :searchQuery="searchQuery" />
    </template>
    <template #actions>
      <AppButton color="green" text="+ Добавить" @click="create" />
    </template>
  </AdminSection>
</template>

<script>
import { useSocials } from '@/use/store/socials'

import AdminSection from '@/components/admin/ui/AdminSection'
import AppButton from '@/components/ui/AppButton'
import AdminSocialsList from '@/components/admin/modules/socials/AdminSocialsList'

export default {
  name: 'Socials',
  components: {
    AdminSocialsList,
    AppButton,
    AdminSection
  },
  setup() {
    const { create } = useSocials()

    return {
      create
    }
  }
}
</script>
