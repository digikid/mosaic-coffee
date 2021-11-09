<template>
  <AppSection title="Добавить партнера" id="add" back>
    <AdminPartnersEdit />
  </AppSection>
</template>

<script>
import AppSection from '@/components/ui/AppSection'
import AdminPartnersEdit from '@/components/admin/modules/partners/AdminPartnersEdit'

export default {
  name: 'Add',
  components: { AdminPartnersEdit, AppSection }
}
</script>

<style lang="scss"></style>
