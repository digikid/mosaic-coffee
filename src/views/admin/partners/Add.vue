<template>
  <AdminSection title="Добавить партнера" id="add" back>
    <AdminPartnersEdit />
  </AdminSection>
</template>

<script>
import AdminSection from '@/components/admin/ui/AdminSection'
import AdminPartnersEdit from '@/components/admin/modules/partners/AdminPartnersEdit'

export default {
  name: 'Add',
  components: { AdminPartnersEdit, AdminSection }
}
</script>
