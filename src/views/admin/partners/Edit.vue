<template>
  <AppSection title="Редактировать партнера" id="edit" back>
    <AdminPartnersEdit />
  </AppSection>
</template>

<script>
import AppSection from '@/components/ui/AppSection'
import AdminPartnersEdit from '@/components/admin/modules/partners/AdminPartnersEdit'

export default {
  name: 'Edit',
  components: { AdminPartnersEdit, AppSection }
}
</script>

<style lang="scss"></style>
