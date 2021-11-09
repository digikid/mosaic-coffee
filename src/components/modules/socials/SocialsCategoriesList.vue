<template>
  <div class="socials">
    <div class="socials__categories" v-if="categories.length">
      <SocialsCategoriesItem
        v-for="category in categories"
        :category="category"
        :key="category.value"
      />
    </div>
    <div class="socials__empty" v-else>
      <AppEmpty
        :title="param('SOCIALS_EMPTY_TITLE')"
        :text="param('SOCIALS_EMPTY_TEXT')"
      />
    </div>
  </div>
</template>

<script>
import { useSocials } from '@/use/store/socials'
import { useSettings } from '@/use/store/settings'

import SocialsCategoriesItem from '@/components/modules/socials/SocialsCategoriesItem'
import AppEmpty from '@/components/ui/AppEmpty'

export default {
  name: 'SocialsCategoriesList',
  components: { AppEmpty, SocialsCategoriesItem },
  setup() {
    const { categories } = useSocials()
    const { param } = useSettings()

    return {
      categories,
      param
    }
  }
}
</script>

<style lang="scss">
.socials {
  margin-top: 42px;

  &__categories {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  @include ml(md) {
    justify-content: center;
    margin-left: -$gutter;
    margin-right: -$gutter;
  }

  &__category {
    width: 100%;

    @include ml(md) {
      width: calc(100% / 2 - #{$gutter * 2});
      margin-left: $gutter;
      margin-right: $gutter;
    }

    @include ml(lg) {
      width: calc(100% / 3 - #{$gutter * 2});
    }
  }
}
</style>
