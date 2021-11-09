<template>
  <AppSection
    id="events"
    :title="param('EVENTS_TITLE')"
    v-if="param('EVENTS_ACTIVE')"
  >
    <template #outside>
      <div class="popcorn" ref="popcorn"></div>
      <div class="cup" ref="cup"></div>
    </template>
    <template #intro v-if="param('EVENTS_TEXT')">
      <p v-html="param('EVENTS_TEXT')" />
    </template>
    <EventsList />
  </AppSection>
</template>

<script>
import Rellax from 'rellax'

import { ref, onMounted } from 'vue'
import { useSettings } from '@/use/store/settings'

import AppSection from '@/components/ui/AppSection'
import EventsList from '@/components/modules/events/EventsList'

export default {
  name: 'SectionEvents',
  components: { EventsList, AppSection },
  setup() {
    const { param } = useSettings()

    const popcorn = ref()
    const cup = ref()

    onMounted(() => {
      new Rellax(popcorn.value, {
        speed: 3
      })

      new Rellax(cup.value, {
        speed: -3
      })
    })

    return {
      popcorn,
      cup,
      param
    }
  }
}
</script>

<style lang="scss">
.section--events {
  position: relative;
  color: $white;
  background-color: $black;
  text-align: center;
  padding-bottom: 0 !important;
  z-index: 3;

  .section__title {
    background: linear-gradient(45deg, $blue, $green);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .section__intro {
    color: rgba($white, 0.4);
  }

  .section__wrapper {
    position: relative;
    z-index: 2;
  }

  .popcorn,
  .cup {
    position: absolute;
    width: 20%;
    @include bg-filler();
    z-index: 2;

    @include ms(md) {
      display: none !important;
    }
  }

  .popcorn {
    min-width: 200px;
    left: 0;
    top: -12%;
    background-image: url('~@/assets/images/popcorn.png');
    background-position: top left;
    padding-bottom: 36%;
  }

  .cup {
    padding-bottom: 20%;
    min-width: 350px;
    right: 3%;
    bottom: -30%;
    top: 60%;
    background-image: url('~@/assets/images/cup-right.png');
  }

  .empty {
    margin: 7.5% auto;
  }
}
</style>
