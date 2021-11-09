<template>
  <AppSection id="intro" v-if="param('INTRO_ACTIVE')">
    <div class="intro">
      <div class="intro__wrapper">
        <div class="intro__logo"></div>
        <div class="intro__subtitle" v-if="param('INTRO_TITLE')">
          {{ param('INTRO_TITLE') }}
        </div>
        <div class="intro__title" v-if="random">{{ random }}</div>
        <div
          class="intro__content"
          v-if="param('INTRO_TEXT')"
          v-html="param('INTRO_TEXT')"
        ></div>
        <div class="intro__actions" v-if="param('INTRO_BUTTON_TEXT')">
          <a
            class="btn intro__btn"
            target="_blank"
            :href="param('INTRO_BUTTON_URL')"
            >{{ param('INTRO_BUTTON_TEXT') }}
          </a>
        </div>
      </div>
    </div>
  </AppSection>
</template>

<script>
import { useSettings } from '@/use/store/settings'
import { useGreetings } from '@/use/store/greetings'

import AppSection from '@/components/ui/AppSection'

export default {
  name: 'SectionIntro',
  components: { AppSection },
  setup() {
    const { param } = useSettings()
    const { random } = useGreetings()

    return {
      param,
      random
    }
  }
}
</script>

<style lang="scss">
.section--intro {
  position: relative;
  color: $white;
  background-color: $black;

  &:before {
    content: '';
    position: absolute;
    top: -15%;
    left: 0;
    width: 100%;
    height: 100%;
    background: {
      image: url('~@/assets/images/intro-bg.jpg'),
        linear-gradient(
          to bottom,
          rgba(#1b1b1b, 0.0001),
          rgba(#1b1b1b, 0.2) 20%,
          $black
        );
      position: center bottom, center;
      size: cover;
    }
  }
}

.intro {
  position: relative;
  width: 100%;
  border-radius: $radius;
  padding-top: 20%;
  padding-bottom: 15%;

  @include ms(lg) {
    padding-top: 25%;
  }

  @include mo(xs) {
    padding-top: 42.5%;
  }

  &__wrapper {
    text-align: center;
    text-shadow: 2px 4px 12px rgba($black, 0.25);
    margin: 5% auto 0;
  }

  &__logo {
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    height: 100px;
    padding-bottom: 15%;
    margin: 0 auto 24px;
    @include bg-filler('~@/assets/images/logo-white.svg');

    @include ms(lg) {
      position: static;
    }
  }

  &__subtitle {
    font-size: 20px;
    margin-bottom: 12px;
  }

  &__title {
    font-size: 48px;
    font-weight: bold;
    line-height: 1.25;
    max-width: 80%;
    margin-left: auto;
    margin-right: auto;

    @include ms(xl) {
      max-width: 100%;
    }

    @include ms(lg) {
      font-size: 42px;
    }

    @include ms(md) {
      font-size: 36px;
    }

    @include mo(xs) {
      font-size: 9vw;
    }
  }

  &__content {
    font-size: 20px;
    margin-top: 32px;

    @include ms(md) {
      font-size: 18px;
    }

    @include mo(xs) {
      font-size: 16px;
      margin-top: 24px;
    }
  }

  &__actions {
    margin-top: 32px;
    margin-bottom: 18px;

    .btn {
      font-size: 20px;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      padding: 12px 24px;
      background: linear-gradient(to right, $yellow, $orange);

      @include ms(md) {
        font-size: 16px;
      }
    }
  }
}
</style>
