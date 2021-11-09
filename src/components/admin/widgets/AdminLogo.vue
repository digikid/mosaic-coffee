<template>
  <RouterLink to="/admin" class="sidebar__logo">
    <img src="~@/assets/images/logo-white.svg" />
  </RouterLink>
</template>

<script>
export default {
  name: 'AdminLogo'
}
</script>

<style lang="scss">
.sidebar {
  &__logo {
    display: block;

    img {
      display: inline-block;
      width: 100%;

      @include mo(xs) {
        width: auto;
      }
    }
  }
}
</style>
