<template>
  <div class="permissions" v-if="items">
    <div class="permissions__header">
      <div class="permissions__row">
        <div class="permissions__col">Раздел</div>
        <div class="permissions__col">Просмотр</div>
        <div class="permissions__col">Правка</div>
      </div>
    </div>
    <div class="permissions__main">
      <AdminPermissionsItem
        v-for="(item, id) in items"
        :key="id"
        :id="id"
        :item="item"
      />
    </div>
  </div>
</template>

<script>
import AdminPermissionsItem from '@/components/admin/ui/permissions/AdminPermissionsItem'

export default {
  name: 'AdminPermissionsList',
  components: { AdminPermissionsItem },
  props: {
    items: Object
  },
  setup() {}
}
</script>

<style lang="scss">
.permissions {
  margin-top: 24px;

  @include ml(xs) {
    background-color: $gray-200;
    border-radius: $radius;
    padding: 18px;
  }

  &__row {
    display: flex;
    align-items: center;
  }

  &__header {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 18px;

    @include mo(xs) {
      font-size: 16px;
    }
  }

  &__col {
    &:nth-child(1) {
      flex-grow: 1;
    }

    &:nth-child(2),
    &:nth-child(3) {
      width: 30%;
      text-align: center;
    }
  }

  .switcher {
    margin: 0;
  }
}
</style>
