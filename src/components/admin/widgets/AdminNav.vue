<template>
  <nav class="sidebar__nav">
    <ul class="sidebar__menu">
      <li
        class="sidebar__link"
        :class="counters[item.url] ? 'has-counter' : null"
        v-for="item in items"
        :key="item.id"
      >
        <RouterLink
          :to="`/admin/${item.url}`"
          :class="isParentActive(item.url) ? 'is-active' : ''"
        >
          <span class="sidebar__icon icon" :class="`icon--${item.url}`"></span>
          {{ item.title }}
          <Transition name="fade">
            <i class="sidebar__counter" v-if="counters[item.url]">{{
              counters[item.url]
            }}</i>
          </Transition>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script>
import { v4 as uid } from 'uuid'
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

import { access } from '@/store/utils/access'

import { useEvents } from '@/use/store/events'
import { useGreetings } from '@/use/store/greetings'
import { usePartners } from '@/use/store/partners'
import { useSocials } from '@/use/store/socials'
import { useContacts } from '@/use/store/contacts'
import { useUsers } from '@/use/store/users'

export default {
  name: 'AdminNav',
  setup() {
    const route = useRoute()

    const activePath = ref('')

    const { items: eventsItems } = useEvents()
    const { items: greetingsItems } = useGreetings()
    const { items: partnersItems } = usePartners()
    const { items: socialsItems } = useSocials()
    const { items: contactsItems } = useContacts()
    const { items: usersItems } = useUsers()

    const counters = computed(() => ({
      events: eventsItems.value.length,
      greetings: greetingsItems.value.length,
      partners: partnersItems.value.length,
      socials: socialsItems.value.length,
      contacts: contactsItems.value.length,
      users: usersItems.value.length
    }))

    const menu = [
      {
        id: uid(),
        title: 'Афиша',
        url: 'events'
      },
      {
        id: uid(),
        title: 'Приветствия',
        url: 'greetings'
      },
      {
        id: uid(),
        title: 'Партнеры',
        url: 'partners'
      },
      {
        id: uid(),
        title: 'Соцсети',
        url: 'socials'
      },
      {
        id: uid(),
        title: 'Контакты',
        url: 'contacts'
      },
      {
        id: uid(),
        title: 'Пользователи',
        url: 'users'
      },
      {
        id: uid(),
        title: 'Настройки',
        url: 'settings'
      }
    ]

    const items = computed(() => menu.filter(item => access(item.url)))

    watch(route, ({ path }) => {
      activePath.value = path
    })

    const isParentActive = path => activePath.value.includes(path)

    return {
      items,
      counters,
      isParentActive,
      access
    }
  }
}
</script>

<style lang="scss">
.sidebar {
  &__nav {
    margin-top: 42px;
    margin-bottom: 42px;
  }

  &__link {
    display: block;
    font-size: 18px;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 12px;

    @include mo(xs) {
      font-size: 6vw;
    }

    &.has-counter {
      a {
        padding-right: 30px;
      }
    }

    a {
      position: relative;
      color: rgba($blue, 0.4);
      @include transition(color);

      &.is-active {
        pointer-events: none;
        color: $blue;
      }

      i {
        position: absolute;
        top: 50%;
        right: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        font-size: 9px;
        font-weight: normal;
        font-style: normal;
        line-height: 20px;
        background-color: $green;
        color: $white;
        border-radius: 50%;
        transform: translateY(-50%);
      }

      span {
        margin-right: 10px;
      }
    }
  }
}
</style>
