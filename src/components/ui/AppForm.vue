<template>
  <form
    ref="form"
    :class="[
      'form',
      {
        [`form--${id}`]: id
      }
    ]"
    @submit.prevent
  >
    <div class="form__header" v-if="$slots.header || title">
      <slot name="header" v-if="$slots.header" />
      <div class="form__title" v-if="title">{{ title }}</div>
    </div>
    <Transition name="fade">
      <div class="form__main" v-show="!isSuccess">
        <slot />
      </div>
    </Transition>
    <div class="form__footer" v-if="$slots.footer">
      <slot name="footer" />
    </div>
    <Transition name="fade">
      <div class="form__success" v-show="isSuccess">
        <slot name="success" />
      </div>
    </Transition>
  </form>
</template>

<script>
import { $$, wrap } from '@/utils/DOM'
import { create as mask } from 'maska'

import { ref, onMounted } from 'vue'

export default {
  name: 'AppForm',
  props: {
    id: {
      type: String,
      default: ''
    },
    title: String,
    isSuccess: Boolean
  },
  setup() {
    const form = ref()

    onMounted(() => {
      const $phones = $$('input[type="tel"]', form.value)
      const $selects = $$('select', form.value)

      if ($selects) {
        Array.from($selects).forEach(select => wrap(select, 'form__select'))
      }

      if ($phones) {
        Array.from($phones).forEach(phone => {
          mask(phone, {
            mask: '+7 (###) ###-####'
          })

          phone.addEventListener('paste', e => e.preventDefault())
        })
      }
    })

    return {
      form
    }
  }
}
</script>

<style lang="scss">
.form {
  label,
  input,
  textarea {
    appearance: none;
  }

  select,
  input[type='tel'],
  input[type='text'],
  input[type='email'],
  input[type='password'],
  input[type='number'],
  input[type='time'],
  textarea,
  select {
    @extend %input;

    &:focus {
      border-color: $blue;
    }
  }

  input,
  textarea {
    @include placeholder() {
      color: $gray-400;
    }
  }

  input[type='number'] {
    -moz-appearance: textfield;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  textarea {
    min-height: 240px;
  }

  select {
    appearance: none;
    background: transparent;
    border: none;
    color: inherit;
    padding-right: 45px;
  }

  &__select {
    position: relative;
    background: $gray-200;
    border-radius: 6px;

    &:before {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);

      @include triangle($border-color: $gray-400);
    }
  }

  input {
    &[type='checkbox']:not(.switcher__input),
    &[type='radio']:not(.switcher__input) {
      width: 24px;
      height: 24px;
      position: absolute;
      opacity: 0;
      padding: 0;
      margin: 0;

      &:focus {
        & + label {
          &:before {
            outline: none;
          }
        }
      }

      & + label {
        position: relative;
        font-weight: normal;
        padding-left: 35px;
        margin: 10px 0;
        cursor: pointer;

        &:before {
          content: '';
          display: inline-block;
          vertical-align: middle;
          position: absolute;
          top: 0;
          left: 0;
          width: 24px;
          height: 24px;
          border: 1px solid $gray-800;
          @include transition(border-color);
        }

        &:empty {
          &:before {
            margin-right: 0;
          }
        }
      }
    }

    &[type='radio']:not(.switcher__input) {
      & + label {
        &:before {
          background: $white;
          border-radius: 50%;
          @include transition(background-color, box-shadow, border-color);
        }
      }

      &:checked {
        & + label {
          &:before {
            background-color: $orange;
            box-shadow: inset 0 0 0 4px $white;
            border-color: $orange;
          }
        }
      }
    }

    &[type='checkbox']:not(.switcher__input) {
      & + label {
        &:before {
          content: '';
          background-color: transparent;
          border-radius: 3px;
        }

        &:after {
          content: '';
          display: block;
          position: absolute;
          top: 5px;
          left: 9px;
          width: 6px;
          height: 12px;
          border: solid $orange;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
          opacity: 0;
          @include transition(opacity);
        }
      }

      &:checked {
        & + label {
          &:before {
            border-color: $orange;
          }

          &:after {
            opacity: 1;
          }
        }
      }
    }
  }

  button {
    &[type='submit'] {
      width: 100%;
      display: block;

      &[disabled],
      &.is-disabled {
        background: $gray-400;
        pointer-events: none;
      }
    }
  }

  &__title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  &__control,
  &__group {
    &.is-invalid {
      input,
      textarea {
        border-color: $red;
      }
    }

    label {
      font-weight: 300;
      display: block;
    }
  }

  &__control {
    margin-bottom: 20px;
  }

  .form__group {
    display: flex;
    flex-wrap: wrap;

    label {
      width: 100%;
    }

    .form__control {
      margin-right: 20px;

      &:last-child {
        flex-grow: 1;
        margin-right: 0;
      }
    }
  }

  &__error,
  &__note {
    display: block;
    font-size: 90%;
    margin-top: 10px;
  }

  &__error {
    color: $red;
  }

  &__note {
    color: $green;
  }

  &__option {
    margin-top: 20px;
  }

  &__agree {
    label {
      margin: 5px 0 !important;
    }
  }

  &__submit {
    margin-top: 30px;
  }

  &__footer {
    margin-top: 42px;

    .btn {
      margin-right: 16px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  &__row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .form__row {
      .form__col {
        @include ms(xl) {
          width: 100%;
        }
      }
    }
  }

  &__col {
    width: 48%;

    .form__row--x3 & {
      @include mo(xl) {
        width: 30%;
      }
    }

    &--fluid {
      width: 100%;
    }

    @include ms(lg) {
      width: 100%;
    }

    input[type='radio'] + label,
    input[type='checkbox'] + label {
      @include ms(lg) {
        margin: 0;
      }
    }
  }

  &__group {
    & > label {
      @include ms(lg) {
        margin-bottom: 15px;
      }
    }
  }

  p + .form__control {
    margin-top: 24px;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  h3 {
    margin-top: 24px;
  }
}
</style>
