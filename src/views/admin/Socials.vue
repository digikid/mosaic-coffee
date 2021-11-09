<template>
  <AppSection title="Соцсети" id="socials">
    <AdminSocialsList />
    <template #actions>
      <AppButton color="green" text="+ Добавить" @click="create" />
    </template>
  </AppSection>
</template>

<script>
import { useSocials } from '@/use/store/socials'

import AppSection from '@/components/ui/AppSection'
import AppButton from '@/components/ui/AppButton'
import AdminSocialsList from '@/components/admin/modules/socials/AdminSocialsList'

export default {
  name: 'Socials',
  components: { AdminSocialsList, AppButton, AppSection },
  setup() {
    const { create } = useSocials()

    return {
      create
    }
  }
}
</script>

<style lang="scss"></style>
