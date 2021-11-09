<template>
  <AdminUploader
    :thumb="modelValue"
    :id="options.id"
    :accept="options.accept"
    :maxSize="options.maxSize"
    @uploaded="onUploaded"
    @removed="onRemoved"
  />
</template>

<script>
import AdminUploader from '@/components/admin/ui/AdminUploader'

export default {
  name: 'AdminParamUploader',
  components: { AdminUploader },
  props: {
    param: Object,
    modelValue: String
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const onUploaded = url => emit('update:modelValue', url)
    const onRemoved = () => emit('update:modelValue', '')

    const OPTIONS_MAP = {
      MAIN_LOGO: {
        id: 'logo',
        accept: ['.jpg, .jpeg', '.png', '.svg'],
        maxSize: 0.5
      },
      INTRO_BG: {
        id: 'bg',
        accept: ['.jpg, .jpeg'],
        maxSize: 1
      },
      EVENTS_BG: {
        id: 'bg',
        accept: ['.jpg, .jpeg'],
        maxSize: 1
      },
      DELIVERY_BG: {
        id: 'bg',
        accept: ['.jpg, .jpeg'],
        maxSize: 1
      },
      SOCIALS_BG: {
        id: 'bg',
        accept: ['.jpg, .jpeg'],
        maxSize: 1
      }
    }

    const options = OPTIONS_MAP[props.param.code] || {
      id: 'images',
      accept: ['.jpg, .jpeg'],
      maxSize: 0.5
    }

    return {
      options,
      onUploaded,
      onRemoved
    }
  }
}
</script>

<style lang="scss">
.uploader--images {
}
</style>
