<template>
  <AdminSection title="Добавить мероприятие" id="add" back>
    <AdminEventsEdit />
  </AdminSection>
</template>

<script>
import AdminSection from '@/components/admin/ui/AdminSection'
import AdminEventsEdit from '@/components/admin/modules/events/AdminEventsEdit'

export default {
  name: 'Add',
  components: { AdminEventsEdit, AdminSection }
}
</script>
