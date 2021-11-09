<template>
  <div class="admin__wrapper">
    <AdminSidebar />
    <AdminMain />
  </div>
</template>

<script>
import AdminMain from '@/components/admin/AdminMain'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default {
  name: 'AdminLayout',
  components: { AdminSidebar, AdminMain }
}
</script>

<style lang="scss">
.admin__wrapper {
  display: flex;

  @include mo(xs) {
    padding-top: 60px;
  }
}
</style>
