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
export default {
  name: 'AdminTable',
  props: {
    headers: {
      type: Array,
      default: () => []
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
      th {
        color: $black;
        line-height: 1.25;
        vertical-align: middle;
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

      &:first-child {
        width: 65px;
      }
    }

    th {
      background-color: $gray-200;
      overflow: hidden;

      &:first-child {
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
      }

      &:last-child {
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
      }
    }

    td {
      overflow: hidden;

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
