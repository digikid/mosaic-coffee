import store from '@/store'

const param = code => store.getters[`settings/param`](code)

export const updatePageTitle = route => {
  const {
    path,
    name,
    meta: { layout }
  } = route

  const mainTitle = param('MAIN_TITLE')

  let title

  if (path === '/' && mainTitle) {
    title = mainTitle
  } else if (layout === 'admin') {
    title = `${name} - Панель администрирования`
  } else {
    title = name
  }

  if (title) {
    document.title = title
  }
}
