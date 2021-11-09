<template>
  <AppSection
    id="socials"
    :title="param('SOCIALS_TITLE')"
    v-if="param('SOCIALS_ACTIVE')"
  >
    <template #outside>
      <div class="cup" ref="cup"></div>
    </template>
    <template #intro v-if="param('SOCIALS_TEXT')">
      <p v-html="param('SOCIALS_TEXT')"></p>
    </template>
    <SocialsCategoriesList />
  </AppSection>
</template>

<script>
import Rellax from 'rellax'

import { ref, onMounted } from 'vue'
import { useSettings } from '@/use/store/settings'

import AppSection from '@/components/ui/AppSection'
import SocialsCategoriesList from '@/components/modules/socials/SocialsCategoriesList'

export default {
  name: 'SectionSocials',
  components: { SocialsCategoriesList, AppSection },
  setup() {
    const { param } = useSettings()

    const cup = ref()

    onMounted(() => {
      new Rellax(cup.value, {
        speed: 4.5,
        center: true
      })
    })

    return {
      cup,
      param
    }
  }
}
</script>

<style lang="scss">
.section--socials {
  position: relative;
  background-color: $white;
  text-align: center;
  padding-top: 30px;

  &:after {
    content: '';
    width: 100%;
    height: 30%;
    position: absolute;
    background: $white;
    z-index: 1;
    left: 0;
    top: -30%;
    transform-origin: right top;
    transform: skewY(-4deg);

    @include ms(xl) {
      height: 20%;
      top: -20%;
    }

    @include ms(lg) {
      height: 10%;
      top: -10%;
    }

    @include mo(xs) {
      top: -8%;
    }
  }

  .cup {
    min-width: 200px;
    position: absolute;
    top: -50%;
    left: -10%;
    width: 30%;
    padding-bottom: 30%;
    @include bg-filler('~@/assets/images/cup-left.png');
    z-index: 2;

    @include ms(md) {
      display: none;
    }
  }

  .section__title {
    background: linear-gradient(45deg, $blue, $violet);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .section__wrapper {
    position: relative;
    z-index: 2;
  }
}
</style>
