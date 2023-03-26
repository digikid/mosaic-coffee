<template>
  <div class="admin-search form">
    <input
      :value="modelValue"
      :placeholder="placeholder"
      id="search"
      type="text"
      class="admin-search__control"
      @input="onInput"
    />
    <i class="admin-search__icon icon icon--search"></i>
  </div>
</template>

<script>
import { computed } from 'vue'
import { toRuLocale } from '@/utils/keyboard'

export default {
  name: 'AdminSearch',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Что вы хотите найти?'
    },
    locale: {
      type: String,
      default: '',
      validator(value) {
        return ['', 'ru'].includes(value)
      }
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const isRuLocale = computed(() => props.locale === 'ru')

    const onInput = e => {
      const { value } = e.target

      emit('update:modelValue', isRuLocale.value ? toRuLocale(value) : value)
    }

    return {
      onInput
    }
  }
}
</script>

<style lang="scss">
.admin-search {
  position: relative;

  $c: #{&};

  #search {
    padding: 10px 12px;
    background-color: $white;
    border-color: $white;

    &:focus {
      border-color: $blue;

      & + #{$c}__icon {
        color: $blue;
        opacity: 1;
      }
    }
  }

  &__icon {
    position: absolute;
    opacity: 0.2;
    right: 12px;
    top: 14px;
    font-size: 20px;

    @include transition(color, opacity);
  }
}
</style>
