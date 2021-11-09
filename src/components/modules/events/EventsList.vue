<template>
  <div class="events">
    <div class="events__carousel" v-if="items.length">
      <Swiper
        :slidesPerView="1.5"
        :slidesPerGroup="1.5"
        :spaceBetween="15"
        :pagination="{
          clickable: true
        }"
        :breakpoints="{
          576: {
            slidesPerView: 2,
            slidesPerGroup: 2
          },
          992: {
            slidesPerView: 3,
            slidesPerGroup: 3
          },
          1200: {
            slidesPerView: 4,
            slidesPerGroup: 4
          },
          1420: {
            slidesPerView: 5,
            slidesPerGroup: 5
          }
        }"
      >
        <SwiperSlide v-for="item in items" :key="item.id">
          <EventsItem :item="item" />
        </SwiperSlide>
      </Swiper>
    </div>
    <div class="events__empty" v-else>
      <AppEmpty
        :title="param('EVENTS_EMPTY_TITLE')"
        :text="param('EVENTS_EMPTY_TEXT')"
      />
    </div>
  </div>
</template>

<script>
import { useSettings } from '@/use/store/settings'
import { useEvents } from '@/use/store/events'

import SwiperCore, { Pagination, Lazy } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'

import EventsItem from '@/components/modules/events/EventsItem'
import AppEmpty from '@/components/ui/AppEmpty'

SwiperCore.use([Pagination, Lazy])

export default {
  name: 'EventsList',
  components: { AppEmpty, EventsItem, Swiper, SwiperSlide },
  setup() {
    const { published: items } = useEvents()
    const { param } = useSettings()

    return {
      items,
      param
    }
  }
}
</script>

<style lang="scss">
.events {
  position: relative;
  z-index: 2;
  margin-top: 54px;
}
</style>
