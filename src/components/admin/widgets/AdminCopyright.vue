<template>
  <div class="sidebar__copyright">
    <p>{{ year }} &copy; Компания «{{ company }}».</p>
    <p>
      Разработка и поддержка сайта
      <a href="https://t.me/digikid" target="_blank">@digikid</a>
    </p>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useSettings } from '@/use/store/settings'

export default {
  name: 'AdminCopyright',
  setup() {
    const { param } = useSettings()

    const year = new Date().getFullYear()

    const company = computed(() => param('MAIN_COMPANY_TITLE'))

    return {
      year,
      company
    }
  }
}
</script>

<style lang="scss">
.sidebar {
  &__copyright {
    font-size: 70%;

    p {
      color: rgba($white, 0.3);
      margin: 0;
    }
  }
}
</style>
