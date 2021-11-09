<template>
  <AppSection id="404">
    <div class="page404">
      <div class="page404__title" title="404">404</div>
      <div class="page404__subtitle">Упс, ничего не найдено</div>
      <div class="page404__text">
        <p>К сожалению, запрашиваемая страница не найдена.</p>
        <p>
          Возможно, вы перешли по ссылке, в которой была допущена ошибка, или
          страница была удалена.
        </p>
      </div>
      <AppButton text="Вернуться назад" @click="$router.go(-1)" />
    </div>
  </AppSection>
</template>

<script>
import AppSection from '@/components/ui/AppSection'
import AppButton from '@/components/ui/AppButton'

export default {
  name: 'NotFound',
  components: { AppButton, AppSection }
}
</script>

<style lang="scss">
@keyframes glitch {
  2%,
  64% {
    transform: translate(2px, 0) skew(0deg);
  }
  4%,
  60% {
    transform: translate(-2px, 0) skew(0deg);
  }
  62% {
    transform: translate(0, 0) skew(5deg);
  }
}

@keyframes glitchTop {
  2%,
  64% {
    transform: translate(2px, -2px);
  }
  4%,
  60% {
    transform: translate(-2px, 2px);
  }
  62% {
    transform: translate(13px, -1px) skew(-13deg);
  }
}

@keyframes glitchBottom {
  2%,
  64% {
    transform: translate(-2px, 0);
  }
  4%,
  60% {
    transform: translate(-2px, 0);
  }
  62% {
    transform: translate(-22px, 5px) skew(21deg);
  }
}

.page404 {
  @include bg-filler('~@/assets/images/beans-01.png') {
    background-position: right center;
  }

  @include ms(lg) {
    background-image: none;
  }

  margin-bottom: 120px;

  &__title {
    font-size: 240px;
    font-weight: 900;
    line-height: 1;
    color: $orange;
    animation: glitch 1s linear infinite;

    @include ms(md) {
      font-size: 30vw;
    }

    &:before,
    &:after {
      content: attr(title);
      position: absolute;
      left: 0;
    }

    &:before {
      animation: glitchTop 1s linear infinite;
      clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
    }

    &:after {
      animation: glitchBottom 1.5s linear infinite;
      clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
    }
  }

  &__subtitle {
    font-size: 42px;
    font-weight: bold;
    color: $gray-300;
    margin-bottom: 24px;

    @include ms(md) {
      font-size: 5vw;
    }
  }

  &__text {
    width: 600px;
    max-width: 100%;
    margin-bottom: 42px;
  }
}
</style>
