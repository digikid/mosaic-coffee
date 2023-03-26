<template>
  <AdminSection title="Доступ запрещен" id="denied">
    <p>Доступ к этой странице запрещен.</p>
    <p>Если вы хотите получить доступ, обратитесь к администратору сайта.</p>
    <br />
    <AppButton text="Вернуться назад" @click="$router.go(-1)" />
  </AdminSection>
</template>

<script>
import AdminSection from '@/components/admin/ui/AdminSection'
import AppButton from '@/components/ui/AppButton'

export default {
  name: 'AccessDenied',
  components: { AppButton, AdminSection }
}
</script>
