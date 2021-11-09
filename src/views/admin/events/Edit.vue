<template>
  <AppSection title="Редактировать мероприятие" id="edit" back>
    <AdminEventsEdit />
  </AppSection>
</template>

<script>
import AppSection from '@/components/ui/AppSection'
import AdminEventsEdit from '@/components/admin/modules/events/AdminEventsEdit'

export default {
  name: 'Edit',
  components: { AdminEventsEdit, AppSection }
}
</script>

<style lang="scss"></style>
