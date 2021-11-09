<template>
  <div
    class="admin__thumb"
    :class="transparent ? 'admin__thumb--transparent' : null"
  >
    <Transition name="fade">
      <img v-show="src" :src="src" :alt="title" :title="title" />
    </Transition>
  </div>
</template>

<script>
export default {
  name: 'AdminThumb',
  props: {
    src: String,
    title: String,
    transparent: Boolean
  }
}
</script>

<style lang="scss">
.admin__thumb {
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  background-color: $gray-200;
  @include transition(opacity);

  @include img-cover();

  &--transparent {
    border-radius: 0;
    overflow: auto;
    background-color: transparent;

    img {
      object-fit: contain;
    }

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      overflow: visible;
      background-color: $gray-200;
    }
  }
}
</style>
