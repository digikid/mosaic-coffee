<template>
  <div
    class="switcher"
    :class="{
      'is-disabled': disabled,
      'switcher--empty': !label
    }"
  >
    <input
      class="switcher__input"
      :id="id"
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
    <label class="switcher__label" :for="id">
      <span v-if="label">{{ label }}</span>
    </label>
  </div>
</template>

<script>
import { v4 as uid } from 'uuid'

export default {
  name: 'AdminSwitcher',
  props: {
    modelValue: Boolean,
    label: String,
    disabled: Boolean
  },
  emits: ['update:modelValue'],
  setup() {
    const id = `switcher-${uid()}`

    return {
      id
    }
  }
}
</script>

<style lang="scss">
.switcher {
  position: relative;
  display: inline-block;
  min-height: 27px;
  margin: 10px 0;
  @include transition(opacity, filter);

  &--empty {
    .switcher__label {
      padding-left: 55px;
    }
  }

  &.is-disabled {
    opacity: 0.2;
    filter: grayscale(100%);
    pointer-events: none;
  }

  &__input {
    appearance: none;
    display: block;
    bottom: 0;
    left: 0;
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;

    &:checked {
      & + .switcher__label {
        &:before {
          background-color: $green;
        }

        &:after {
          background-color: white;
          border-radius: 50%;
          height: 21px;
          left: 30px;
          top: 3px;
          width: 21px;
        }
      }
    }
  }

  &__label {
    display: block;
    position: relative;
    padding-bottom: 3px;
    padding-left: 70px;
    padding-top: 2px;

    &:before,
    &:after {
      border: 1px solid $green;
      content: '';
      display: block;
      position: absolute;
      cursor: pointer;
    }

    &:before {
      border-radius: 30px;
      height: 27px;
      left: 0;
      top: 0;
      @include transition(background-color);
      width: 54px;
    }

    &:after {
      background-color: $green;
      border-radius: 50%;
      height: 21px;
      left: 3px;
      top: 3px;
      @include transition(left);
      width: 21px;
    }
  }
}
</style>
