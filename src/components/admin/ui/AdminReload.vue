<template>
  <div class="reload">
    <div class="reload__spinner">
      <AppSpinner />
    </div>
    <div class="reload__text">
      <p>Подождите, происходит обновление элементов...</p>
    </div>
  </div>
</template>

<script>
import AppSpinner from '@/components/ui/AppSpinner.vue'

export default {
  name: 'AdminReload',
  components: {
    AppSpinner
  }
}
</script>

<style lang="scss">
.reload {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 20% auto;

  &__text {
    opacity: 0.3;
    margin-top: 42px;
  }
}
</style>
