import store from '@/store'

import { createRouter, createWebHistory } from 'vue-router'

import { updatePageTitle } from '@/router/utils/title'
import { access } from '@/store/utils/access'

import Home from '@/views/Home'
import Login from '@/views/Login'
import NotFound from '@/views/NotFound'

const { BASE_URL } = process.env

const adminMeta = {
  layout: 'admin',
  auth: true
}

const routes = [
  {
    path: '/',
    name: 'Спасибо, что выбираете Mosaic Coffee and tea!',
    component: Home,
    meta: {
      layout: 'main'
    }
  },
  {
    path: '/login',
    name: 'Авторизация',
    component: Login,
    meta: {
      layout: 'login'
    }
  },
  {
    path: '/admin/events',
    name: 'Афиша',
    alias: '/admin',
    component: () =>
      import(/* webpackChunkName: "admin" */ '@/views/admin/Events.vue'),
    meta: adminMeta
  },
  {
    path: '/admin/events/add',
    name: 'Добавить мероприятие',
    component: () =>
      import(/* webpackChunkName: "admin" */ '@/views/admin/events/Add.vue'),
    meta: adminMeta
  },
  {
    path: '/admin/events/:id',
    name: 'Редактировать мероприятие',
    component: () =>
      import(/* webpackChunkName: "admin" */ '@/views/admin/events/Edit.vue'),
    meta: adminMeta
  },
  {
    path: '/admin/partners',
    name: 'Партнеры',
    component: () =>
      import(/* webpackChunkName: "admin" */ '@/views/admin/Partners.vue'),
    meta: adminMeta
  },
  {
    path: '/admin/partners/add',
    name: 'Добавить партнера',
    component: () =>
      import(/* webpackChunkName: "admin" */ '@/views/admin/partners/Add.vue'),
    meta: adminMeta
  },
  {
    path: '/admin/partners/:id',
    name: 'Редактировать партнера',
    component: () =>
      import(/* webpackChunkName: "admin" */ '@/views/admin/partners/Edit.vue'),
    meta: adminMeta
  },
  {
    path: '/admin/socials',
    name: 'Соцсети',
    component: () =>
      import(/* webpackChunkName: "admin" */ '@/views/admin/Socials.vue'),
    meta: adminMeta
  },
  {
    path: '/admin/socials/add',
    name: 'Добавить соцсеть',
    component: () =>
      import(/* webpackChunkName: "admin" */ '@/views/admin/socials/Add.vue'),
    meta: adminMeta
  },
  {
    path: '/admin/socials/:id',
    name: 'Редактировать соцсеть',
    component: () =>
      import(/* webpackChunkName: "admin" */ '@/views/admin/socials/Edit.vue'),
    meta: adminMeta
  },
  {
    path: '/admin/greetings',
    name: 'Пожелания',
    component: () =>
      import(/* webpackChunkName: "admin" */ '@/views/admin/Greetings.vue'),
    meta: adminMeta
  },
  {
    path: '/admin/contacts',
    name: 'Контакты',
    component: () =>
      import(/* webpackChunkName: "admin" */ '@/views/admin/Contacts.vue'),
    meta: adminMeta
  },
  {
    path: '/admin/contacts/add',
    name: 'Добавить контакт',
    component: () =>
      import(/* webpackChunkName: "admin" */ '@/views/admin/contacts/Add.vue'),
    meta: adminMeta
  },
  {
    path: '/admin/contacts/:id',
    name: 'Редактировать контакт',
    component: () =>
      import(/* webpackChunkName: "admin" */ '@/views/admin/contacts/Edit.vue'),
    meta: adminMeta
  },
  {
    path: '/admin/users',
    name: 'Пользователи',
    component: () =>
      import(/* webpackChunkName: "admin" */ '@/views/admin/Users.vue'),
    meta: adminMeta
  },
  {
    path: '/admin/users/add',
    name: 'Добавить пользователя',
    component: () =>
      import(/* webpackChunkName: "admin" */ '@/views/admin/users/Add.vue'),
    meta: adminMeta
  },
  {
    path: '/admin/users/:id',
    name: 'Редактировать пользователя',
    component: () =>
      import(/* webpackChunkName: "admin" */ '@/views/admin/users/Edit.vue'),
    meta: adminMeta
  },
  {
    path: '/admin/settings',
    name: 'Настройки',
    component: () =>
      import(/* webpackChunkName: "admin" */ '@/views/admin/Settings.vue'),
    meta: adminMeta
  },
  {
    path: '/admin/denied',
    name: 'Доступ запрещен',
    component: () =>
      import(/* webpackChunkName: "admin" */ '@/views/admin/AccessDenied.vue'),
    meta: adminMeta
  },
  {
    path: '/:notFound(.*)',
    name: 'Ничего не найдено',
    component: NotFound,
    meta: {
      layout: 'main',
      is404: true
    }
  }
]

const router = createRouter({
  routes,
  history: createWebHistory(BASE_URL),
  linkActiveClass: 'is-active',
  linkExactActiveClass: 'is-active'
})

const protectedRoutes = Object.keys(
  store.getters['users/empty'].permissions
).map(route => `/admin/${route}`)

router.beforeEach(async (to, from, next) => {
  const {
    path,
    meta: { auth }
  } = to

  const isRouteProtected = protectedRoutes.reduce(
    (acc, route) => acc || path.includes(route),
    false
  )

  if (auth && !store.getters['auth/isAuthenticated']) {
    next('/login?message=auth')
  } else if (isRouteProtected) {
    const module = path.match(/\/admin\/([^/]+)/)[1]

    if (!store.getters['users/current']) {
      await store.dispatch('users/load')
    }

    if (!access(module)) {
      next('/admin/denied')
    } else {
      next()
    }
  } else {
    next()
  }

  updatePageTitle(to)
})

export default router
