<template>
  <div class="sidebar__actions">
    <div class="sidebar__action sidebar__action--browse">
      <RouterLink to="/" target="_blank" class="btn btn--orange">
        Перейти на сайт
      </RouterLink>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminActions'
}
</script>

<style lang="scss">
.sidebar {
  &__actions {
    margin-bottom: 18px;
  }

  &__action {
    margin-bottom: 7px;

    .btn {
      display: block;
    }
  }
}
</style>
