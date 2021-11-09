<template>
  <main class="main">
    <RouterView />
  </main>
</template>

<script>
export default {
  name: 'TheMain'
}
</script>

<style lang="scss">
.main {
  flex-grow: 1;

  .section__title {
    text-align: center;
  }
}
</style>
