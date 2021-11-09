<template>
  <aside class="admin__sidebar">
    <div class="sidebar">
      <div class="sidebar__outer" :class="isActive ? 'is-active' : null">
        <a class="sidebar__close" href="#" @click.prevent="toggleSidebar"></a>
        <div class="sidebar__inner" ref="inner">
          <div class="sidebar__main">
            <AdminWidget layout="logo">
              <AdminLogo />
            </AdminWidget>
            <AdminWidget layout="nav">
              <AdminNav />
            </AdminWidget>
          </div>
          <AdminUser />
          <AdminActions />
          <AdminCopyright />
        </div>
      </div>
      <div class="sidebar__mobile">
        <div class="sidebar__heading">Панель администрирования</div>
        <a
          class="sidebar__toggle"
          href="#"
          @click.prevent.stop="toggleSidebar"
        ></a>
      </div>
    </div>
  </aside>
</template>

<script>
import { ref, onMounted } from 'vue'
import SimpleBar from 'simplebar'

import AdminActions from '@/components/admin/widgets/AdminActions'
import AdminWidget from '@/components/admin/ui/AdminWidget'
import AdminCopyright from '@/components/admin/widgets/AdminCopyright'
import AdminNav from '@/components/admin/widgets/AdminNav'
import AdminLogo from '@/components/admin/widgets/AdminLogo'
import AdminUser from '@/components/admin/widgets/AdminUser'

export default {
  name: 'AdminSidebar',
  components: {
    AdminUser,
    AdminLogo,
    AdminNav,
    AdminCopyright,
    AdminWidget,
    AdminActions
  },
  setup() {
    const inner = ref()
    const isActive = ref()

    const toggleSidebar = () => {
      isActive.value = !isActive.value
    }

    onMounted(() => {
      document.addEventListener('click', () => {
        isActive.value = false
      })

      new SimpleBar(inner.value, {
        timeout: 500
      })
    })

    return {
      inner,
      isActive,
      toggleSidebar
    }
  }
}
</script>

<style lang="scss">
.sidebar {
  &__outer {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 100%;
    color: $white;
    background: $black;
    z-index: 2;
    @include transition(transform 0.3s);

    @media screen and (max-width: 1560px) {
      transform: translateX(-100%);
    }

    @include mo(xs) {
      width: 100%;
    }

    &.is-active {
      @media screen and (max-width: 1560px) {
        transform: none;
      }
    }
  }

  &__toggle,
  &__close {
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    width: 50px;
    height: 50px;
    background: $black;
    color: $white;

    @media screen and (min-width: 1561px) {
      display: none;
    }
  }

  &__toggle {
    position: fixed;
    left: 0;
    z-index: 1;

    @include mo(xs) {
      position: static;
    }

    @include icomoon(cogs) {
      font-size: 32px;
    }
  }

  &__close {
    right: 0;

    @include icomoon(x) {
      font-size: 14px;
    }
  }

  &__mobile {
    @include ml(xs) {
      min-height: 720px;
    }

    @include mo(xs) {
      width: 100%;
      height: 60px;
      position: fixed;
      left: 0;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: $black;
      padding-left: $gutter;
      padding-right: $gutter;
      z-index: 1;
    }
  }

  &__heading {
    color: $white;
    font-size: 5vw;
    margin: 0;

    @include ml(xs) {
      display: none;
    }
  }

  &__inner {
    width: 100%;
    padding: 40px;
    height: 100%;

    @include mo(xs) {
      padding: 24px;
    }
  }

  &__main {
    flex-grow: 1;
  }
}
</style>
