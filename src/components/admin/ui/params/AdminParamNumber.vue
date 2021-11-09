<template>
  <div class="form__control">
    <label v-if="param.title">{{ param.title }}</label>
    <input
      type="number"
      :value="modelValue"
      @input="$emit('update:modelValue', Number($event.target.value))"
    />
  </div>
</template>

<script>
export default {
  name: 'AdminParamNumber',
  props: {
    param: Object,
    modelValue: Number
  },
  emits: ['update:modelValue']
}
</script>

<style lang="scss"></style>
