<template>
  <AppSection
    :title="param('PARTNERS_TITLE')"
    id="partners"
    v-if="param('PARTNERS_ACTIVE')"
  >
    <template #intro v-if="param('PARTNERS_TEXT')">
      <p v-html="param('PARTNERS_TEXT')"></p>
    </template>
    <PartnersList />
  </AppSection>
</template>

<script>
import { useSettings } from '@/use/store/settings'

import AppSection from '@/components/ui/AppSection'
import PartnersList from '@/components/modules/partners/PartnersList'

export default {
  name: 'SectionPartners',
  components: { PartnersList, AppSection },
  setup() {
    const { param } = useSettings()

    return {
      param
    }
  }
}
</script>

<style lang="scss">
.section--partners {
  position: relative;
  background-color: $white;
  text-align: center;
  padding-top: 0;

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
  }

  .cup {
    min-width: 200px;
    position: absolute;
    top: -10%;
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
    background: linear-gradient(45deg, $red, $yellow);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .section__wrapper {
    position: relative;
    z-index: 2;
  }
}
</style>
