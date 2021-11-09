<template>
  <AppForm id="sort">
    <div class="form__title" v-if="title">{{ title }}</div>
    <div class="form__control">
      <select
        :value="modelValue"
        @change="$emit('update:modelValue', $event.target.value)"
      >
        <option
          v-for="(option, i) in options"
          :key="option.value"
          :value="option.value"
          :checked="!i"
        >
          {{ option.title }}
        </option>
      </select>
    </div>
  </AppForm>
</template>

<script>
import AppForm from '@/components/ui/AppForm'

export default {
  name: 'AdminSort',
  components: { AppForm },
  props: {
    title: String,
    options: Array,
    modelValue: String
  },
  emits: ['update:modelValue']
}
</script>

<style lang="scss">
.form--sort {
  width: 375px;
  max-width: 100%;
  margin-bottom: 42px;
}
</style>
