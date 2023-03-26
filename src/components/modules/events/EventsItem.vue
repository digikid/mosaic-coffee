<template>
  <div class="events__item">
    <div class="events__header">
      <div
        class="events__label events__label--discount"
        v-if="item.discount"
      ></div>
      <div class="events__thumb">
        <AppImage :src="item.thumb || item.thumbUrl" />
      </div>
    </div>
    <div class="events__content">
      <div class="events__title">{{ item.title }}</div>
      <div class="events__info">
        <div class="events__date">{{ date(item) }}</div>
        <div class="events__time"></div>
      </div>
      <div class="events__place"></div>
      <div class="events__price">
        {{ price(item) }} <i class="icon icon--ruble"></i>
      </div>
    </div>
    <div class="events__footer">
      <a class="btn btn--orange" target="_blank" :href="item.url"
        >Купить билет</a
      >
    </div>
  </div>
</template>

<script>
import { getSeparatedDate } from '@/utils/date'

import AppImage from '@/components/ui/AppImage'

export default {
  name: 'EventsItem',
  components: { AppImage },
  props: {
    item: Object
  },
  setup() {
    const price = ({ minPrice, maxPrice }) =>
      maxPrice ? `${minPrice} - ${maxPrice}` : minPrice

    const date = ({ date }) => {
      const { day, month, year, weekday } = getSeparatedDate(date)

      return `${day} ${month} ${year} (${weekday})`
    }

    return {
      price,
      date
    }
  }
}
</script>

<style lang="scss">
.events {
  &__item {
    background-color: $white;
    border-radius: $radius;
    overflow: hidden;
    @include shadow();
  }

  &__header {
    position: relative;
  }

  &__label {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 10px;
    right: 10px;
    width: 38px;
    height: 38px;
    font-size: 28px;
    color: $yellow;
    z-index: 2;

    @include icomoon(discount);

    &:after {
      content: '';
      position: absolute;
      top: 8px;
      left: 8px;
      width: 20px;
      height: 20px;
      background-color: $white;
      border-radius: 50%;
      z-index: -1;
    }
  }

  &__thumb {
    width: 100%;
    padding-bottom: 142%;

    @include img-cover();
  }

  &__content,
  &__footer {
    padding: 12px;
  }

  &__content {
    color: $text;
  }

  &__footer {
    padding-top: 0;

    .btn {
      display: block;
      border-bottom: 3px solid darken($orange, 5%);
    }
  }

  &__title {
    font-size: 16px;
    font-weight: bold;
  }

  &__price {
    font-size: 18px;
    color: $green;
    font-weight: 600;
    margin-top: 7px;
  }

  &__date {
    font-size: 13px;
    opacity: 0.6;
  }
}

.icon--ruble {
  font-size: 75%;
}
</style>
