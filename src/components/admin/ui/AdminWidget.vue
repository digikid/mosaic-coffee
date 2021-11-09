<template>
  <div
    class="admin__widget"
    :class="layout ? `admin__widget--${layout}` : null"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'AdminWidget',
  props: {
    layout: String
  }
}
</script>

<style lang="scss">
.admin__widget {
  margin-bottom: 18px;
}
</style>
