<template>
  <div class="empty">
    <div class="empty__title" v-if="title">{{ title }}</div>
    <div class="empty__text" v-if="text" v-html="text"></div>
  </div>
</template>

<script>
export default {
  name: 'AppEmpty',
  props: {
    title: String,
    text: String
  }
}
</script>

<style lang="scss">
.empty {
  width: 70%;
  color: $text;
  background: $gray-200;
  border-radius: $radius * 2;
  padding: 54px;
  margin-left: auto;
  margin-right: auto;

  @include ms(lg) {
    width: 80%;
    padding: 32px;
  }

  @include ms(md) {
    width: 100%;
  }

  @include mo(xs) {
    padding: 24px $gutter;
  }

  &__title {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 24px;

    @include mo(xs) {
      font-size: 26px;
      margin-bottom: 18px;
    }
  }

  &__text {
    font-size: 18px;
  }
}
</style>
