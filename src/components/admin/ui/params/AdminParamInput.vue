<template>
  <div class="form__control">
    <label v-if="param.title">{{ param.title }}</label>
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: 'AdminParamInput',
  props: {
    param: Object,
    modelValue: String
  },
  emits: ['update:modelValue']
}
</script>
