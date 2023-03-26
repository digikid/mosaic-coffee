<template>
  <div class="partners">
    <div class="partners__carousel" v-if="items.length">
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
          <PartnersItem :item="item" />
        </SwiperSlide>
      </Swiper>
    </div>
    <div class="partners__empty" v-else>
      <AppEmpty
        :title="param('PARTNERS_EMPTY_TITLE')"
        :text="param('PARTNERS_EMPTY_TEXT')"
      />
    </div>
  </div>
</template>

<script>
import { usePartners } from '@/use/store/partners'
import { useSettings } from '@/use/store/settings'

import SwiperCore, { Pagination, Lazy } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import PartnersItem from '@/components/modules/partners/PartnersItem'
import AppEmpty from '@/components/ui/AppEmpty'

SwiperCore.use([Pagination, Lazy])

export default {
  name: 'PartnersList',
  components: { AppEmpty, PartnersItem, Swiper, SwiperSlide },
  setup() {
    const { published: items } = usePartners()
    const { param } = useSettings()

    return {
      items,
      param
    }
  }
}
</script>

<style lang="scss">
.partners {
  position: relative;
  z-index: 2;
  margin-top: 32px;
}
</style>
