<template>
  <button
    v-if="text"
    :class="[
      'btn',
      {
        [`btn--${color}`]: color
      }
    ]"
    :type="submit ? 'submit' : null"
  >
    <i v-if="icon" :class="`btn__icon icon icon--${icon}`" /> {{ text }}
  </button>
</template>

<script>
export default {
  name: 'AppButton',
  props: {
    text: {
      type: String,
      required: true
    },
    color: String,
    icon: String,
    submit: Boolean
  }
}
</script>

<style lang="scss">
.btn {
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  background-color: $blue;
  color: $white;
  border: 0;
  font-weight: 600;
  text-align: center;
  box-shadow: none;
  cursor: pointer;
  border-radius: 5px;
  padding: 12px 24px;
  outline: 0 !important;
  box-shadow: none !important;

  @include transition(background);

  @include hover() {
    color: $white;
    background-color: lighten($blue, 3%);
  }

  &[disabled],
  &.is-disabled {
    pointer-events: none;
    background: $gray-400 !important;
  }

  &--orange {
    background-color: $orange;

    @include hover() {
      background-color: lighten($orange, 7%);
    }
  }

  &--green {
    background-color: $green;

    @include hover() {
      background-color: lighten($green, 5%);
    }
  }

  &--red {
    background-color: darken($red, 5%);

    @include hover() {
      background-color: $red;
    }
  }

  &--gray {
    background-color: $gray-400;

    @include hover() {
      background-color: lighten($gray-400, 3%);
    }
  }

  &--border {
    background-color: $white;
    color: $gray-500;
    border: 2px solid $gray-500;
    @include transition(color, background-color, border-color);

    @include hover() {
      background-color: $white;
      color: $text;
      border-color: $text;
    }
  }

  &__icon {
    font-size: 110%;
    vertical-align: middle;
    margin-right: 8px;
  }
}
</style>
