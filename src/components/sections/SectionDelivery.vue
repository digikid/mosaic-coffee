<template>
  <AppSection id="delivery" v-if="param('DELIVERY_ACTIVE')">
    <div class="bg" ref="bg"></div>
    <div class="delivery">
      <div class="delivery__wrapper">
        <div class="delivery__title" v-if="param('DELIVERY_TITLE')">
          {{ param('DELIVERY_TITLE') }}
        </div>
        <div
          class="delivery__text"
          v-if="param('DELIVERY_TEXT')"
          v-html="param('DELIVERY_TEXT')"
        ></div>
        <div class="delivery__actions" v-if="param('DELIVERY_BUTTON_TEXT')">
          <a class="btn" target="_blank" :href="param('DELIVERY_BUTTON_URL')">{{
            param('DELIVERY_BUTTON_TEXT')
          }}</a>
        </div>
      </div>
    </div>
  </AppSection>
</template>

<script>
import Rellax from 'rellax'

import { ref, onMounted } from 'vue'
import { useSettings } from '@/use/store/settings'

import AppSection from '@/components/ui/AppSection'

export default {
  name: 'SectionDelivery',
  components: { AppSection },
  setup() {
    const { param } = useSettings()
    const bg = ref()

    onMounted(() => {
      new Rellax(bg.value, {
        speed: 3
      })
    })

    return {
      param,
      bg
    }
  }
}
</script>

<style lang="scss">
.section--delivery {
  color: $white;
  padding-top: 0 !important;

  @include mo(xs) {
    margin-top: -10%;
  }

  &:after {
    content: '';
    width: 100%;
    height: 20%;
    position: absolute;
    left: 0;
    top: 0;
    transform-origin: left top;
    transform: skewY(-4deg);
    background: $black;
    z-index: -1;
  }
}

.bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 150%;
  z-index: -1;
  @include bg-cover('~@/assets/images/delivery-bg.jpg');
}

.delivery {
  position: relative;
  padding-top: 25%;
  padding-bottom: 15%;
  z-index: 2;

  @include ms(lg) {
    padding-top: 35%;
    padding-bottom: 25%;
  }

  @include mo(xs) {
    padding-top: 55%;
    padding-bottom: 50%;
  }

  @include mo(xs) {
    text-align: center;
  }

  &__wrapper {
    width: 460px;
    max-width: 100%;
  }

  &__title,
  &__text {
    text-shadow: 2px 4px 12px rgba($black, 0.25);
  }

  &__title {
    font-size: 54px;
    line-height: 1.25;
    font-weight: bold;
    margin-bottom: 24px;

    @include ms(xl) {
      font-size: 42px;
    }

    @include mo(xs) {
      font-size: 32px;
    }
  }

  &__text {
    font-size: 18px;
  }

  &__actions {
    margin-top: 42px;

    .btn {
      width: 200px;
      font-size: 20px;
      text-transform: uppercase;
      background: linear-gradient(to right, $red, $yellow);
    }
  }
}
</style>
