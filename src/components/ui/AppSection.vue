<template>
  <section
    :class="[
      'section',
      {
        [`section--admin`]: isAdmin
      },
      {
        [`section--${id}`]: !isAdmin && id
      },
      {
        [`section--${layout}`]: layout
      }
    ]"
    :id="id ? `section-${id}` : null"
    :style="bg ? `background-image: url(${bg});` : null"
  >
    <slot name="outside" v-if="$slots.outside"></slot>
    <div
      v-if="title || $slots.intro || $slots.actions || back"
      class="section__header"
    >
      <div class="section__wrapper container">
        <div class="section__title" v-if="title">{{ title }}</div>
        <div class="section__intro" v-if="$slots.intro">
          <slot name="intro"></slot>
        </div>
        <div class="section__actions" v-if="$slots.actions || back">
          <slot name="actions" />
          <AppButton
            v-if="back"
            color="gray"
            text="← Назад"
            @click="$router.go(-1)"
          />
        </div>
      </div>
    </div>
    <div
      :class="[
        'section__content',
        {
          wysiwyg: wysiwyg
        }
      ]"
    >
      <div :class="['section__wrapper', `container${fluid ? '-fluid' : ''}`]">
        <slot></slot>
      </div>
    </div>
  </section>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import AppButton from '@/components/ui/AppButton'

export default {
  name: 'AppSection',
  components: { AppButton },
  props: {
    id: {
      type: String,
      required: true
    },
    title: String,
    layout: String,
    bg: String,
    fluid: Boolean,
    back: Boolean,
    wysiwyg: Boolean
  },
  setup() {
    const route = useRoute()
    const isAdmin = computed(() => route.meta.layout === 'admin')

    return {
      isAdmin
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

  &__actions {
    @include ms(md) {
      margin-top: 18px;
    }
  }

  &__intro {
    font-size: 18px;
    margin-top: 7px;
    color: rgba($text, 0.4);
  }
}
</style>
