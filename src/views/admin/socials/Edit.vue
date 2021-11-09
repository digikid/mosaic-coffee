<template>
  <AppSection title="Редактировать соцсеть" id="edit" back>
    <AdminSocialsEdit />
  </AppSection>
</template>

<script>
import AppSection from '@/components/ui/AppSection'
import AdminSocialsEdit from '@/components/admin/modules/socials/AdminSocialsEdit'

export default {
  name: 'Edit',
  components: { AdminSocialsEdit, AppSection }
}
</script>

<style lang="scss"></style>
