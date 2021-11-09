<template>
  <AppSection title="Добавить мероприятие" id="add" back>
    <AdminEventsEdit />
  </AppSection>
</template>

<script>
import AppSection from '@/components/ui/AppSection'
import AdminEventsEdit from '@/components/admin/modules/events/AdminEventsEdit'

export default {
  name: 'Add',
  components: { AdminEventsEdit, AppSection }
}
</script>

<style lang="scss"></style>
