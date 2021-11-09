import { createLogger, createStore } from 'vuex'

import auth from '@/store/modules/auth.module'
import events from '@/store/modules/events.module'
import greetings from '@/store/modules/greetings.module'
import partners from '@/store/modules/partners.module'
import socials from '@/store/modules/socials.module'
import contacts from '@/store/modules/contacts.module'
import users from '@/store/modules/users.module'
import settings from '@/store/modules/settings.module'

const { NODE_ENV } = process.env

const plugins = []

if (NODE_ENV === 'development') {
  plugins.push(createLogger())
}

export default createStore({
  modules: {
    auth,
    events,
    greetings,
    partners,
    socials,
    contacts,
    users,
    settings
  },
  plugins
})
