<template>
  <div class="admin-tabs" v-if="tabs.length">
    <ul class="admin-tabs__nav">
      <li
        v-for="tab in tabs"
        :key="tab.props.title"
        :class="[
          'admin-tabs__link',
          {
            'is-active': tab.props.title === selectedIndex
          }
        ]"
      >
        <a href="#" @click.prevent="selectedIndex = tab.props.title">
          {{ tab.props.title }}
        </a>
      </li>
    </ul>
    <div class="admin-tabs__main">
      <slot />
    </div>
  </div>
</template>

<script>
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  provide,
  reactive,
  toRefs
} from 'vue'

const isTab = node => node.type.name === 'AdminTab'
const isFragment = node =>
  typeof node.type === 'symbol' && node.type.description === 'Fragment'
const hasTabs = node =>
  node.children && node.children.length && node.children.some(isTab)
const isTabParent = node => isFragment(node) && hasTabs(node)

export default {
  name: 'AdminTabs',
  setup(_, { slots }) {
    const state = reactive({
      selectedIndex: null,
      tabs: [],
      count: 0
    })

    provide('TabsProvider', state)

    const selectTab = i => {
      state.selectedIndex = i
    }

    const update = () => {
      if (slots.default) {
        state.tabs = slots
          .default()
          .filter(node => isTab(node) || isTabParent(node))
          .flatMap(node => (isTabParent(node) ? node.children : node))
      }
    }

    onBeforeMount(update)
    onBeforeUpdate(update)

    onMounted(() => {
      const selectedIndex = state.tabs.findIndex(
        tab => 'active' in tab.props || 'selected' in tab.props
      )
      const activeIndex = selectedIndex !== -1 ? selectedIndex : 0
      const activeTitle = state.tabs.length
        ? state.tabs[activeIndex].props.title
        : null

      selectTab(activeTitle)
    })

    return {
      ...toRefs(state),
      selectTab
    }
  }
}
</script>

<style lang="scss">
.admin-tabs {
  &__nav {
    list-style: none;
    display: flex;
    padding: 0;
    margin-bottom: 24px;
    border-bottom: 1px solid $gray-200;
    @include touch-scroll();
    padding-bottom: 0;

    @include mo(xs) {
      margin-bottom: 30px;
    }
  }

  &__link {
    text-align: center;
    margin: 0;

    &.is-active {
      a {
        color: $orange;
      }
    }

    &:first-child {
      a {
        border-top-left-radius: 6px;
      }
    }

    &:last-child {
      a {
        border-right: 1px solid $gray-200;
        border-top-right-radius: 6px;
      }
    }

    a {
      display: inline-flex;
      color: $text;
      border-radius: 0;
      padding: 10px 20px;
      border-top: 1px solid $gray-200;
      border-left: 1px solid $gray-200;

      @include mo(xs) {
        font-size: 16px;
      }
    }
  }

  &__main {
  }
}
</style>
