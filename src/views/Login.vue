<template>
  <AppSection id="login">
    <div class="login">
      <div class="login__bg">
        <div class="login__circle login__circle--small"></div>
        <div class="login__circle login__circle--medium"></div>
        <div class="login__circle login__circle--large"></div>
        <div class="login__circle login__circle--xlarge"></div>
        <div class="login__circle login__circle--xxlarge"></div>
      </div>
      <div class="login__form">
        <AppForm id="login" @submit.prevent="onSubmit">
          <template #header>
            <div class="form__title">Войти на сайт</div>
            <div class="form__text" v-if="text">{{ text }}</div>
          </template>
          <div
            :class="[
              'form__control',
              {
                'is-invalid': emailError
              }
            ]"
          >
            <label for="email">Электронная почта</label>
            <input
              type="email"
              id="email"
              placeholder="example@mail.com"
              required
              v-model="email"
            />
            <div class="form__error" v-if="emailError">{{ emailError }}</div>
          </div>
          <div
            :class="[
              'form__control',
              {
                'is-invalid': passwordError
              }
            ]"
          >
            <label>Пароль</label>
            <input
              type="password"
              class="password__input"
              spellcheck="false"
              placeholder="••••••••••••"
              v-model="password"
            />
            <div class="form__error" v-if="passwordError">
              {{ passwordError }}
            </div>
          </div>
          <template #footer>
            <AppButton
              text="Войти"
              color="orange"
              submit
              :disabled="isSubmitting || !isValid"
            />
          </template>
        </AppForm>
      </div>
    </div>
  </AppSection>
</template>

<script>
import { useLoginForm } from '@/use/forms/login'

import AppForm from '@/components/ui/AppForm'
import AppButton from '@/components/ui/AppButton'
import AppSection from '@/components/ui/AppSection'

export default {
  name: 'Login',
  components: { AppSection, AppButton, AppForm },
  setup() {
    return {
      ...useLoginForm()
    }
  }
}
</script>

<style lang="scss">
.login {
  position: relative;

  &__bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &__circle {
    &--small {
      -webkit-animation: circle-small-scale 3s ease-in-out infinite alternate;
      animation: circle-small-scale 3s ease-in-out infinite alternate;
      animation-timing-function: cubic-bezier(0.6, 0, 0.4, 1);
      animation-delay: 0s;
      position: absolute;
      top: 200px;
      left: -150px;
      background: #fff;
      width: 300px;
      height: 300px;
      border-radius: 50%;
      opacity: 0.4;
    }

    &--medium {
      -webkit-animation: circle-small-scale 3s ease-in-out infinite alternate;
      animation: circle-small-scale 3s ease-in-out infinite alternate;
      animation-timing-function: cubic-bezier(0.6, 0, 0.4, 1);
      animation-delay: 0.3s;
      position: absolute;
      top: 50px;
      left: -300px;
      background: #fff;
      width: 600px;
      height: 600px;
      border-radius: 50%;
      opacity: 0.3;
    }

    &--large {
      -webkit-animation: circle-small-scale 3s ease-in-out infinite alternate;
      animation: circle-small-scale 3s ease-in-out infinite alternate;
      animation-timing-function: cubic-bezier(0.6, 0, 0.4, 1);
      animation-delay: 0.6s;
      position: absolute;
      top: -100px;
      left: -450px;
      background: #fff;
      width: 900px;
      height: 900px;
      border-radius: 50%;
      opacity: 0.2;
    }

    &--xlarge {
      -webkit-animation: circle-small-scale 3s ease-in-out infinite alternate;
      animation: circle-small-scale 3s ease-in-out infinite alternate;
      animation-timing-function: cubic-bezier(0.6, 0, 0.4, 1);
      animation-delay: 0.9s;
      position: absolute;
      top: -250px;
      left: -600px;
      background: #fff;
      width: 1200px;
      height: 1200px;
      border-radius: 50%;
      opacity: 0.1;
    }

    &--xxlarge {
      -webkit-animation: circle-small-scale 3s ease-in-out infinite alternate;
      animation: circle-small-scale 3s ease-in-out infinite alternate;
      animation-timing-function: cubic-bezier(0.6, 0, 0.4, 1);
      animation-delay: 1.2s;
      position: absolute;
      top: -400px;
      left: -750px;
      background: #fff;
      width: 1500px;
      height: 1500px;
      border-radius: 50%;
      opacity: 0.05;
    }
  }
  &__form {
    width: 500px;
    max-width: 100%;
    background: $white;
    box-shadow: 0 30px 60px 0 rgba($black, 0.3);
    border-radius: 12px;
    opacity: 0;
    padding: 60px;
    margin: 0 auto;
    animation: fadeIn 0.6s ease-in-out forwards;

    @include mo(xs) {
      padding: 30px;
    }

    .btn {
      font-size: 20px;
      padding: 18px 24px;
    }
  }
}

@keyframes circle-small-scale {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1);
  }
}

.page--login {
  background: lighten($primary, 15%);
  overflow: hidden;

  .main {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.form--login {
  .form__title {
    @include font-size(32, 42);
  }

  .form__text {
    margin-top: -15px;
    margin-bottom: 30px;
  }

  .form__footer {
    margin-top: 30px;
  }
}
</style>
