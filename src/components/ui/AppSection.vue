<template>
  <section
    :class="className"
    :id="id ? `section-${id}` : null"
    :style="bg ? `background-image: url(${bg});` : null"
  >
    <slot name="outside" v-if="$slots.outside"></slot>
    <div v-if="title || $slots.intro" class="section__header">
      <div class="section__wrapper container">
        <div class="section__title" v-if="title">{{ title }}</div>
        <div class="section__intro" v-if="$slots.intro">
          <slot name="intro"></slot>
        </div>
      </div>
    </div>
    <div :class="contentClassName">
      <div :class="wrapperClassName">
        <slot />
      </div>
    </div>
  </section>
</template>

<script>
import { computed } from 'vue'
export default {
  name: 'AppSection',
  props: {
    id: {
      type: String,
      required: true
    },
    title: String,
    layout: String,
    bg: String,
    fluid: Boolean,
    wysiwyg: Boolean
  },
  setup(props) {
    const className = computed(() => {
      const classNames = ['section']

      if (props.id) {
        classNames.push(`section--${props.id}`)
      }

      if (props.layout) {
        classNames.push(`section--${props.layout}`)
      }

      if (props.wysiwyg) {
        classNames.push(`section--wysiwyg`)
      }

      return classNames.join(' ')
    })

    const contentClassName = computed(() => {
      const classNames = ['section__content']

      if (props.wysiwyg) {
        classNames.push('wysiwyg')
      }

      return classNames.join(' ')
    })

    const wrapperClassName = computed(() => {
      const classNames = ['section__wrapper']

      if (props.fluid) {
        classNames.push('container-fluid')
      } else {
        classNames.push('container')
      }

      return classNames.join(' ')
    })

    return {
      className,
      contentClassName,
      wrapperClassName
    }
  }
}
</script>

<style lang="scss">
.section {
  position: relative;
  width: 100%;
  padding: 50px 0;

  @include bg-cover();

  @include mo(xs) {
    padding: 30px 0;
  }

  &__title {
    @extend #title;
    margin-bottom: 0;
  }

  &__intro {
    font-size: 18px;
    margin-top: 7px;
    color: rgba($text, 0.4);
  }
}
</style>
