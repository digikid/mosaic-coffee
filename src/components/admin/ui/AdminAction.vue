<template>
  <a v-if="icon" :class="['action', `action--${icon}`]" href="#" @click.prevent>
    <i :class="['icon', `icon--${icon}`]"></i>
  </a>
</template>

<script>
export default {
  name: 'AdminAction',
  props: {
    icon: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
.action {
  font-size: 20px;
  cursor: pointer;
  margin: 5px 7px;
  @include transition(opacity);

  &[disabled='true'] {
    opacity: 0.4;
    pointer-events: none;
  }

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }

  &--show {
    color: $blue;

    @include hover() {
      color: lighten($blue, 5%);
    }
  }

  &--edit {
    color: $green;

    @include hover() {
      color: lighten($green, 5%);
    }
  }

  &--remove {
    color: $red;

    @include hover() {
      color: lighten($red, 15%);
    }
  }
}
</style>
