<template>
  <div
    class="socials__category"
    :class="`socials__category--${category.value}`"
  >
    <div class="socials__title">{{ title }}</div>
    <div class="socials__list">
      <SocialsItem v-for="item in items" :key="item.id" :item="item" />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useSocials } from '@/use/store/socials'
import { useSettings } from '@/use/store/settings'

import SocialsItem from '@/components/modules/socials/SocialsItem'

export default {
  name: 'SocialsCategoriesItem',
  components: { SocialsItem },
  props: {
    category: Object
  },
  setup(props) {
    const { param } = useSettings()
    const { published: socials, getByCategory } = useSocials()

    const items = computed(() =>
      socials.value.filter(({ category }) => category === props.category.value)
    )

    const title = computed(() =>
      param(`SOCIALS_TITLE_${props.category.value.toUpperCase()}`)
    )

    return {
      items,
      title,
      getByCategory
    }
  }
}
</script>

<style lang="scss">
.socials {
  &__category {
    border-radius: $radius;
    background-color: $gray-200;
    padding: 24px;
    margin-bottom: 30px;
    @include shadow();

    &--reviews {
      background: linear-gradient(
        45deg,
        lighten($blue, 5%),
        lighten($green, 5%)
      );
    }
  }

  &__title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 24px;

    @include mo(xs) {
      font-size: 18px;
    }
  }

  &__list {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
