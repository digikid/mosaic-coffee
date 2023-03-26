<template>
  <AdminSection title="Добавить соцсеть" id="add" back>
    <AdminSocialsEdit />
  </AdminSection>
</template>

<script>
import AdminSection from '@/components/admin/ui/AdminSection'
import AdminSocialsEdit from '@/components/admin/modules/socials/AdminSocialsEdit'

export default {
  name: 'Add',
  components: { AdminSocialsEdit, AdminSection }
}
</script>
