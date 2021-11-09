<template>
  <footer class="footer">
    <div class="footer__top">
      <div class="footer__wrapper container">
        <div class="footer__row">
          <div class="footer__col footer__col--logo">
            <div class="footer__logo">
              <img
                src="~@/assets/images/logo-white.svg"
                :alt="param('MAIN_TITLE')"
                :title="param('MAIN_TITLE')"
              />
            </div>
          </div>
          <div class="footer__col footer__col--contacts" v-if="contacts.length">
            <div class="footer__contacts">
              <a
                class="footer__contact"
                v-for="contact in contacts"
                :key="contact.id"
                :href="contact.href"
                :target="contact.category === 'url' ? '_target' : ''"
              >
                {{ contact.title }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer__bottom">
      <div class="footer__wrapper container">
        <div class="footer__copyright">
          <p>
            {{ year }} &copy; Компания «{{ param('MAIN_COMPANY_TITLE') }}». Все
            права защищены
          </p>
          <p>
            Разработано в
            <a target="_blank" href="https://megamir.ru/">МегаМир</a>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { useContacts } from '@/use/store/contacts'
import { useSettings } from '@/use/store/settings'

export default {
  name: 'TheFooter',
  setup() {
    const { param } = useSettings()
    const { items } = useContacts()

    const year = new Date().getFullYear()

    const contacts = computed(() => {
      return [...items.value].reverse().map(item => {
        const { id, category, value } = item

        const result = {
          id: '',
          title: '',
          href: '',
          icon: '',
          category: ''
        }

        if (!item || !item.category) return result

        if (category === 'email') {
          result.title = value
          result.href = `mailto:${value}`
          result.icon = 'edit'
        }

        if (category === 'phone') {
          result.title = value
          result.href = `tel:${value}`
          result.icon = category
        }

        if (category === 'url') {
          result.title = value.match(/^https?:\/\/([^/?#]+)(?:[/?#]|$)/i)[1]
          result.href = value
          result.icon = 'www'
        }

        return {
          ...result,
          id,
          category
        }
      })
    })

    return {
      param,
      contacts,
      year
    }
  }
}
</script>

<style lang="scss">
.footer {
  position: relative;
  color: $white;
  background: $black;

  @include ms(md) {
    text-align: center;
  }

  &__top,
  &__bottom {
    padding: 20px 0;
  }

  &__top {
    background: rgba($white, 0.075);
  }

  &__row {
    @include ml(sm) {
      display: flex;
      align-content: center;
      justify-content: space-between;
    }
  }

  &__col {
    &--logo {
      flex-shrink: 0;
    }

    &--contacts {
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }

  &__contacts {
    @include ms(md) {
      margin-top: 24px;
    }

    @include ml(sm) {
      text-align: right;
    }
  }

  &__contact {
    display: inline-block;
    font-weight: 600;
    font-size: 18px;
    text-transform: uppercase;
    margin-left: 24px;
    margin-bottom: 3px;

    @include ms(lg) {
      margin-left: 12px;
    }

    .icon {
      position: relative;
      top: 2px;
      display: inline-block;
      margin-right: 5px;
    }
  }

  &__copyright {
    font-size: 12px;
    color: $gray-900;
    text-align: center;

    p {
      margin: 0;
    }
  }
}
</style>
