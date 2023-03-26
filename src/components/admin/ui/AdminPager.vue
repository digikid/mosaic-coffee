<template>
  <div class="pager">
    <div class="pager__select">
      <AdminSelect
        :options="options"
        label="Выводить по:"
        @change="onSelectChange"
      />
    </div>
  </div>
</template>

<script>
import { pagerOptions } from '@/config'

import AdminSelect from '@/components/admin/ui/AdminSelect.vue'

export default {
  name: 'AdminPager',
  components: {
    AdminSelect
  },
  setup(_, { emit }) {
    const options = pagerOptions
      .map(value => ({
        label: value,
        value
      }))
      .concat([
        {
          label: 'Все',
          value: -1
        }
      ])

    const onSelectChange = e => {
      const { value } = e.target

      emit('update', Number(value))
    }

    return {
      options,
      onSelectChange
    }
  }
}
</script>

<style lang="scss">
.pager {
  position: relative;
  display: inline-block;
  vertical-align: middle;
}
</style>
