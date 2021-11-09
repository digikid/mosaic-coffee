<template>
  <AppSection title="Доступ запрещен" id="denied">
    <p>Доступ к этой странице запрещен.</p>
    <p>Если вы хотите получить доступ, обратитесь к администратору сайта.</p>
    <br />
    <AppButton text="Вернуться назад" @click="$router.go(-1)" />
  </AppSection>
</template>

<script>
import AppSection from '@/components/ui/AppSection'
import AppButton from '@/components/ui/AppButton'

export default {
  name: 'AccessDenied',
  components: { AppButton, AppSection }
}
</script>

<style lang="scss"></style>
