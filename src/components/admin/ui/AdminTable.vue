<template>
  <div class="admin__table-wrapper">
    <table class="table admin__table">
      <thead v-if="headers.length">
        <th v-for="header in headers" :key="header">{{ header }}</th>
      </thead>
      <tbody>
        <slot />
      </tbody>
    </table>
  </div>
</template>

<script>
import { v4 as uid } from 'uuid'

export default {
  name: 'AdminTable',
  props: {
    headers: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    return {
      uid
    }
  }
}
</script>

<style lang="scss">
.admin {
  &__table {
    table-layout: fixed;
    min-width: 900px;
    margin-bottom: 20px;

    &-wrapper {
      max-width: 100%;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }

    thead {
      border-bottom: 1px solid $gray-200;

      th {
        font-size: 120%;
        color: $black;
        border: 0;
      }

      tr {
        border-bottom: 1px solid $gray-200;
      }
    }

    tbody {
      tr {
        border-bottom: 1px solid $gray-200;
        @include transition(color);

        &:last-child {
          border-bottom: 0;
        }

        &.is-inactive {
          color: $gray-400;

          a:not(.action),
          .admin__thumb {
            opacity: 0.4;
          }
        }
      }

      td {
        border: 0;
      }
    }

    th,
    td {
      vertical-align: middle;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;

      &:first-child {
        width: 50px;
      }

      p {
        margin: 0;
      }
    }

    .btn {
      font-size: 16px;
      margin: 5px 10px 5px 0;

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
