<template>
  <AppSection title="Партнеры" id="partners">
    <AdminPartnersList />
    <template #actions>
      <AppButton color="green" text="+ Добавить" @click="create" />
    </template>
  </AppSection>
</template>

<script>
import { usePartners } from '@/use/store/partners'

import AppSection from '@/components/ui/AppSection'
import AppButton from '@/components/ui/AppButton'
import AdminPartnersList from '@/components/admin/modules/partners/AdminPartnersList'

export default {
  name: 'Partners',
  components: { AdminPartnersList, AppButton, AppSection },
  setup() {
    const { create } = usePartners()

    return {
      create
    }
  }
}
</script>

<style lang="scss"></style>
