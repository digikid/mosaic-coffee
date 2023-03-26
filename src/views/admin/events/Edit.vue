<template>
  <AdminSection title="Редактировать мероприятие" id="edit" back>
    <AdminEventsEdit />
  </AdminSection>
</template>

<script>
import AdminSection from '@/components/admin/ui/AdminSection'
import AdminEventsEdit from '@/components/admin/modules/events/AdminEventsEdit'

export default {
  name: 'Edit',
  components: { AdminEventsEdit, AdminSection }
}
</script>
