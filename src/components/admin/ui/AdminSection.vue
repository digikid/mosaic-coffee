<template>
  <section :class="className" :id="id ? `section-${id}` : null">
    <div v-if="title || $slots.actions || back" class="admin-section__header">
      <div class="admin-section__wrapper container">
        <div class="admin-section__title" v-if="title">{{ title }}</div>
        <div
          class="admin-section__actions"
          v-if="$slots.actions || back || pager"
        >
          <AdminPager v-if="pager" @update="updateLimit" />
          <slot v-if="$slots.actions" name="actions" />
          <AppButton
            v-if="back"
            color="gray"
            text="← Назад"
            @click="$router.go(-1)"
          />
        </div>
      </div>
    </div>
    <div class="admin-section__toolbar" v-if="search || $slots.toolbar">
      <div class="admin-section__wrapper container">
        <div class="admin-section__box">
          <div class="admin-section__search" v-if="search">
            <AdminSearch v-model="searchQuery" locale="ru" />
          </div>
          <div class="admin-section__bar" v-if="$slots.toolbar">
            <slot name="toolbar" />
          </div>
        </div>
      </div>
    </div>
    <div class="admin-section__content">
      <div class="admin-section__wrapper container">
        <slot :limit="limit" :searchQuery="searchQuery" />
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { pageLimit } from '@/config'

import AppButton from '@/components/ui/AppButton'
import AdminPager from '@/components/admin/ui/AdminPager'
import AdminSearch from '@/components/admin/ui/AdminSearch.vue'

export default {
  name: 'AppSection',
  components: { AppButton, AdminPager, AdminSearch },
  props: {
    id: {
      type: String,
      required: true
    },
    title: String,
    back: Boolean,
    pager: Boolean,
    search: Boolean
  },
  setup(props) {
    const route = useRoute()

    const limit = ref(pageLimit)
    const searchQuery = ref('')

    const isAdmin = computed(() => route.meta.layout === 'admin')

    const className = computed(() => {
      const classNames = ['admin-section']

      if (isAdmin.value) {
        classNames.push('admin-section--admin')
      }

      if (props.id) {
        classNames.push(`admin-section--${props.id}`)
      }

      return classNames.join(' ')
    })

    const updateLimit = value => {
      limit.value = value
    }

    const resetSearch = () => {
      searchQuery.value = ''
    }

    watch(() => route.path, resetSearch)

    return {
      isAdmin,
      className,
      limit,
      searchQuery,
      updateLimit
    }
  }
}
</script>

<style lang="scss">
.admin-section {
  position: relative;
  width: 100%;
  padding: 50px 0;

  @include mo(xs) {
    padding: 30px 0;
  }

  $c: &;

  &__header {
    #{$c}__wrapper {
      margin-bottom: 42px;

      @include ml(sm) {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 42px;
      }
    }
  }

  &__title {
    @extend #title;
    margin-bottom: 0;
  }

  &__actions {
    vertical-align: middle;

    & > * {
      margin-right: 18px;

      &:last-child {
        margin-right: 0;
      }
    }

    @include ms(md) {
      margin-top: 18px;
    }
  }

  &__toolbar {
    text-align: right;
    margin-bottom: 32px;

    @include ms(lg) {
      text-align: left;
      margin-top: -12px;
    }

    .btn {
      margin-right: 18px;

      @include ms(lg) {
        margin-bottom: 12px;
      }

      &:last-child {
        margin-right: 0;
      }
    }

    .form--sort {
      @include ms(lg) {
        width: 100%;
      }

      .form__control {
        margin-bottom: 0;
      }

      select {
        background-color: $white;
        border-color: $white;
        padding: 12px 32px 12px 18px;
      }
    }
  }

  &__box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background-color: $gray-200;
    border-radius: 6px;
    padding: 16px;
  }

  &__search {
    display: inline-block;
    flex-grow: 1;
  }

  &__bar {
    display: inline-block;
    margin-left: 64px;

    @include ms(lg) {
      width: 100%;
      margin-left: 0;
      margin-top: 16px;
    }
  }
}
</style>
