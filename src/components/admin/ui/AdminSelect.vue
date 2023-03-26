<template>
  <div class="select" v-if="options.length">
    <select class="select__control">
      <option disabled selected>{{ label }}</option>
      <option v-for="{ label, value } in options" :key="value" :value="value">
        {{ label }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'AdminSelect',
  props: {
    label: {
      type: String,
      default: 'Выберите...'
    },
    options: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss">
.select {
  position: relative;
  cursor: pointer;
  overflow: hidden;

  &:after {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);

    @include triangle($border-color: $gray-400);
  }

  select {
    appearance: none;
    outline: 0;
    border: 0;
    box-shadow: none;
    flex: 1;
    padding: 12px 42px 12px 24px;
    border-radius: 5px;
    border-radius: 0.25em;
    background-color: $gray-200;
    background-image: none;
    cursor: pointer;

    &::-ms-expand {
      display: none;
    }
  }
}
</style>
