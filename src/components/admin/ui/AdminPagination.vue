<template>
  <nav class="pagination" v-if="links.length > 1">
    <ul class="pagination__list">
      <li
        :class="[
          'pagination__item',
          'pagination__item--back',
          {
            'is-disabled': !current
          }
        ]"
      >
        <a href="#" @click.prevent="$emit('to', 0)"> &lt;&lt; </a>
      </li>
      <li
        :class="[
          'pagination__item',
          'pagination__item--next',
          {
            'is-disabled': !current
          }
        ]"
      >
        <a href="#" @click.prevent="$emit('prev')"> &lt; </a>
      </li>
      <li
        class="pagination__item"
        v-for="link in links"
        :key="link.index"
        :class="[
          'pagination__item',
          {
            'is-active': link.index === current
          }
        ]"
      >
        <a href="#" @click.prevent="$emit('to', link.index)">
          {{ link.index + 1 }}
        </a>
      </li>
      <li
        :class="[
          'pagination__item',
          'pagination__item--next',
          {
            'is-disabled': current === items.length - 1
          }
        ]"
      >
        <a href="#" @click.prevent="$emit('next')"> &gt; </a>
      </li>
      <li
        :class="[
          'pagination__item',
          'pagination__item--end',
          {
            'is-disabled': current === items.length - 1
          }
        ]"
      >
        <a href="#" @click.prevent="$emit('to', items.length - 1)">
          &gt;&gt;
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'AdminPagination',
  props: {
    items: {
      type: Array,
      required: true
    },
    links: {
      type: Array,
      required: true
    },
    current: {
      type: Number,
      required: true
    }
  },
  emits: ['to', 'prev', 'next', 'start', 'end']
}
</script>

<style lang="scss">
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 24px;

  &__list {
    display: inline-flex;
    align-items: center;
    list-style: none;
    border: 1px solid $gray-200;
    padding: 0;
    margin: 0;
    border-radius: 10px;
    overflow: hidden;
  }

  &__item {
    border-right: 1px solid $gray-200;

    &:last-child {
      border-right: 0;
    }

    &:hover {
      a {
        color: $orange;
      }
    }

    &.is-active {
      a {
        color: $orange;
      }
    }

    &.is-disabled {
      pointer-events: none;

      a {
        opacity: 0.3;
      }
    }

    a {
      display: inline-block;
      color: $gray-500;
      padding: 9px 18px;
    }
  }
}
</style>
