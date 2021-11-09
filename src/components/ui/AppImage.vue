<template>
  <Transition name="image">
    <img :src="src" @load="onLoaded" v-show="isLoaded" />
  </Transition>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'AppImage',
  props: {
    src: {
      type: String,
      required: true
    }
  },
  setup() {
    const isLoaded = ref()

    const onLoaded = () => {
      isLoaded.value = true
    }

    return {
      isLoaded,
      onLoaded
    }
  }
}
</script>

<style lang="scss">
.image-enter-active,
.image-leave-active {
  transition: opacity 0.6s ease !important;
}

.image-enter-from,
.image-leave-to {
  opacity: 0 !important;
}
</style>
