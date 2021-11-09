<template>
  <div class="editor">
    <div class="editor__actions">
      <a class="editor__action editor__action--save" href="#"></a>
      <a class="editor__action editor__action--remove" href="#"></a>
    </div>
    <div class="editor__form form">
      <textarea
        class="editor__textarea"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      ></textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminEditor',
  props: {
    modelValue: String
  },
  emits: ['update:modelValue']
}
</script>

<style lang="scss"></style>
