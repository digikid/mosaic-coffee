<template>
  <AppSection title="Добавить соцсеть" id="add" back>
    <AdminSocialsEdit />
  </AppSection>
</template>

<script>
import AppSection from '@/components/ui/AppSection'
import AdminSocialsEdit from '@/components/admin/modules/socials/AdminSocialsEdit'

export default {
  name: 'Add',
  components: { AdminSocialsEdit, AppSection }
}
</script>

<style lang="scss"></style>
