<template>
  <a class="partners__item" target="_blank" :href="item.url">
    <AppImage
      :src="item.thumb || item.thumbUrl"
      :alt="item.title"
      :title="item.title"
    />
  </a>
</template>

<script>
import AppImage from '@/components/ui/AppImage'

export default {
  name: 'PartnersItem',
  components: { AppImage },
  props: {
    item: Object
  }
}
</script>

<style lang="scss">
.partners__item {
  display: block;
  width: 100%;
  padding-bottom: 50%;
  @include transition(filter);

  @include hover() {
    filter: grayscale(1);
  }

  @include img-filler();

  img {
    width: 80%;
    left: 10%;
  }
}
</style>
