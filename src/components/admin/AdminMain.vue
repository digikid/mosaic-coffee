<template>
  <div class="admin__main">
    <RouterView />
  </div>
</template>

<script>
export default {
  name: 'AdminMain'
}
</script>

<style lang="scss">
.admin__main {
  overflow: hidden;
  padding-left: 300px;
  flex-grow: 1;
  padding-bottom: 40px;

  @media screen and (max-width: 1560px) {
    padding-left: 0;
  }
}
</style>
