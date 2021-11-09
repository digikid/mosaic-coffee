<template>
  <AppSection id="events" title="Афиша">
    <AdminEventsList />
    <template #actions>
      <AppButton color="green" text="+ Добавить" @click="create" />
    </template>
  </AppSection>
</template>

<script>
import { useEvents } from '@/use/store/events'

import AppSection from '@/components/ui/AppSection'
import AdminEventsList from '@/components/admin/modules/events/AdminEventsList'
import AppButton from '@/components/ui/AppButton'

export default {
  name: 'Events',
  components: { AppButton, AdminEventsList, AppSection },
  setup() {
    const { create } = useEvents()

    return {
      create
    }
  }
}
</script>

<style lang="scss"></style>
