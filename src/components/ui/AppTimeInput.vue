<template>
  <div class="form form--time">
    <input
      ref="input"
      type="text"
      :value="modelValue"
      :placeholder="placeholder"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
      @input="$emit('input', $event)"
    />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { create as mask } from 'maska'
import { isValidTimeString, parseTimeString } from '@/utils/time'

export default {
  name: 'AppTimeInput',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '00:00'
    }
  },
  emits: ['update:modelValue', 'complete', 'focus', 'blur', 'input'],
  setup(_, { emit }) {
    const input = ref()

    onMounted(() => {
      mask(input.value, {
        mask: '##:##'
      })

      input.value.addEventListener('maska', e => {
        let { value } = e.target
        const [hours, minutes] = parseTimeString(value)

        if (hours > 23) {
          value = value.replace(`${hours}:`, '23:')
        }

        if (minutes > 59) {
          value = value.replace(`:${minutes}`, ':59')
        }

        if (isValidTimeString(value)) {
          emit('complete', value)
        }

        emit('update:modelValue', value)
      })
    })

    return {
      input
    }
  }
}
</script>

<style lang="scss">
.form--time {
  width: 100px;
}
</style>
