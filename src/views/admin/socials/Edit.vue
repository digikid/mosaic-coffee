<template>
  <AdminSection title="Редактировать соцсеть" id="edit" back>
    <AdminSocialsEdit />
  </AdminSection>
</template>

<script>
import AdminSection from '@/components/admin/ui/AdminSection'
import AdminSocialsEdit from '@/components/admin/modules/socials/AdminSocialsEdit'

export default {
  name: 'Edit',
  components: { AdminSocialsEdit, AdminSection }
}
</script>
