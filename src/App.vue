<template>
  <div v-cloak class="wrapper">
    <transition name="fade">
      <AppLoader v-if="isLoading" />
      <div v-else :class="['page', pageClass]">
        <component :is="layout + '-layout'" />
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

import { useRoute } from 'vue-router'

import { useAuth } from '@/use/store/auth'
import { useEvents } from './use/store/events'
import { useGreetings } from './use/store/greetings'
import { usePartners } from '@/use/store/partners'
import { useSocials } from '@/use/store/socials'
import { useContacts } from '@/use/store/contacts'
import { useSettings } from './use/store/settings'
import { useUsers } from '@/use/store/users'

import { updatePageTitle } from '@/router/utils/title'

import MainLayout from './layout/MainLayout'
import AdminLayout from './layout/AdminLayout'
import LoginLayout from './layout/LoginLayout'
import AppLoader from './components/ui/AppLoader'

export default {
  name: 'App',
  components: { AppLoader, AdminLayout, MainLayout, LoginLayout },
  setup() {
    const route = useRoute()

    const layout = computed(() => route.meta.layout)

    const pageClass = computed(() => {
      const { path, meta } = route

      const pathArr = path.replace(/^\/|\/$/g, '').split('/')

      let current

      if (path === '/') {
        current = 'home'
      } else if (path.includes('admin')) {
        current = 'admin'
      } else if (meta.is404) {
        current = '404'
      } else {
        current = pathArr[pathArr.length - 1]
      }

      return `page--${current}`
    })

    const isLoading = ref(true)

    const { isAuthenticated } = useAuth()

    const { load: loadEvents } = useEvents()
    const { load: loadGreetings } = useGreetings()
    const { load: loadPartners } = usePartners()
    const { load: loadSocials } = useSocials()
    const { load: loadContacts } = useContacts()
    const { load: loadUsers } = useUsers()
    const { load: loadSettings } = useSettings()

    ;(async () => {
      await loadSettings()
      await loadEvents()
      await loadGreetings()
      await loadPartners()
      await loadSocials()
      await loadContacts()

      if (isAuthenticated.value) {
        await loadUsers()
      }

      isLoading.value = false

      updatePageTitle(route)
    })()

    return {
      isLoading,
      layout,
      pageClass
    }
  }
}
</script>

<style lang="scss">
[v-cloak] {
  display: block;
}

[v-cloak] > * {
  display: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease !important;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0 !important;
}

.app,
.wrapper,
.page {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 100%;
}

.page {
  position: relative;
}
</style>
