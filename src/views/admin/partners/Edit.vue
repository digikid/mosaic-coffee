<template>
  <AdminSection title="Редактировать партнера" id="edit" back>
    <AdminPartnersEdit />
  </AdminSection>
</template>

<script>
import AdminSection from '@/components/admin/ui/AdminSection'
import AdminPartnersEdit from '@/components/admin/modules/partners/AdminPartnersEdit'

export default {
  name: 'Edit',
  components: { AdminPartnersEdit, AdminSection }
}
</script>
