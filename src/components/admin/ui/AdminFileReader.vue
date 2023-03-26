<template>
  <div
    ref="reader"
    :class="['file-reader', `file-reader--${layout}`]"
    @dragenter.stop.prevent="focus"
    @dragover.stop.prevent="focus"
    @dragleave.stop.prevent="blur"
    @drop.stop.prevent="onDrop"
  >
    <form class="file-reader__form" v-if="layout === 'button'">
      <label :for="`file-reader-${id}`" class="btn">
        <i class="btn__icon icon icon--upload"></i> {{ buttonText }}
      </label>
      <input
        :id="`file-reader-${id}`"
        :multiple="multiple"
        :accept="inputAccept"
        type="file"
        class="file-reader__control"
        ref="input"
        @change="onChange"
      />
    </form>
    <div class="file-reader__area" v-else>
      <div class="file-reader__icon">
        <i class="icon icon--upload"></i>
      </div>
      <div class="file-reader__text">{{ text }}</div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { v4 as uid } from 'uuid'
import { read } from '@/utils/fs'
import { message } from '@/utils/system/message'

export default {
  name: 'AdminFileLoader',
  props: {
    layout: {
      type: String,
      default: 'area',
      validator(value) {
        return ['area', 'button'].includes(value)
      }
    },
    text: {
      type: String,
      default: 'Для загрузки перетащите файл в эту область'
    },
    buttonText: {
      type: String,
      default: 'Загрузить файл'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    extensions: {
      type: Array,
      default: () => []
    },
    accept: {
      type: Array,
      default: () => []
    }
  },
  emits: ['upload', 'error', 'success'],
  setup(props, { emit }) {
    const reader = ref()
    const input = ref()
    const id = uid()

    const inputAccept = computed(() => {
      if (props.accept || props.extensions) {
        return [...props.accept, ...props.extensions].join(',')
      }

      return null
    })

    const focus = () => {
      reader.value.classList.add('is-focused')
    }

    const blur = () => {
      reader.value.classList.remove('is-focused')
    }

    const onChange = e => processFiles([...e.target.files])

    const onDrop = e => processFiles([...e.dataTransfer.files])

    const processFiles = async uploadedFiles => {
      const files = uploadedFiles.filter(file => {
        if (props.accept.length && !props.accept.includes(file.type)) {
          emit('error', {
            file,
            message: message('FILE_READER_INVALID_TYPE')
          })

          return false
        }

        if (
          props.extensions.length &&
          !props.extensions.some(extension => file.name.endsWith(extension))
        ) {
          emit('error', {
            file,
            message: message('FILE_READER_INVALID_EXTENSION')
          })

          return false
        }

        return true
      })

      if (files.length) {
        emit('upload', props.multiple ? files : files[0])

        const data = await Promise.all(
          (props.multiple ? files : [files[0]]).map(
            async file => await read(file)
          )
        )

        emit('success', props.multiple ? data : data[0])
      }

      blur()
    }

    return {
      id,
      reader,
      input,
      inputAccept,
      focus,
      blur,
      onDrop,
      onChange
    }
  }
}
</script>

<style lang="scss">
.file-reader {
  &--button {
    display: inline-block;
  }

  label {
    appearance: none;
    margin: 0;
  }

  &__form {
    display: inline-block;
  }

  &__area {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: $gray-200;
    border: 2px dashed darken($gray-200, 10%);
    border-radius: 6px;
    padding: 16px;
    @include transition(border-color);

    &.is-focused {
      border-color: $blue;
    }
  }

  &__control {
    display: none;
  }

  &__icon {
    font-size: 64px;
    opacity: 0.15;
  }

  &__text {
    font-weight: 600;
    opacity: 0.4;
    margin-bottom: 24px;
  }
}
</style>
