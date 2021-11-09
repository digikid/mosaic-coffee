<template>
  <a class="socials__item" target="_blank" :href="item.url">
    <div class="socials__icon">
      <AppImage
        :src="item.thumb || item.thumbUrl"
        :alt="item.title"
        :title="item.title"
      />
    </div>
  </a>
</template>

<script>
import AppImage from '@/components/ui/AppImage'
export default {
  name: 'SocialsItem',
  components: { AppImage },
  props: {
    item: Object
  }
}
</script>

<style lang="scss">
.socials {
  &__item {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    background-color: $white;
    border-radius: 50%;
    margin-left: $gutter;
    margin-right: $gutter;
    @include shadow();
    @include transition(transform);

    @include hover() {
      transform: scale(0.95);
    }

    @media screen and (max-width: 360px) {
      width: 60px;
      height: 60px;
      margin-left: 10px;
      margin-right: 10px;
    }

    img {
      width: 60%;
      height: 60%;
    }
  }
}
</style>
