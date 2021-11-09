<template>
  <AdminSwitcher
    :label="param.title"
    :modelValue="modelValue"
    @change="$emit('update:modelValue', $event.target.checked)"
  />
</template>

<script>
import AdminSwitcher from '@/components/admin/ui/AdminSwitcher'

export default {
  name: 'AdminParamSwitcher',
  components: { AdminSwitcher },
  props: {
    param: Object,
    modelValue: Boolean
  },
  emits: ['update:modelValue']
}
</script>

<style lang="scss"></style>
