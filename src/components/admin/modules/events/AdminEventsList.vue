<template>
  <div class="admin-events">
    <div class="admin-events__list" v-if="items.length">
      <AdminTable
        :headers="[
          '#',
          'Постер',
          'Название',
          'Дата и время',
          'Место проведения',
          'Активность',
          'Действия'
        ]"
      >
        <AdminEventsItem
          v-for="(item, i) in pages[current]"
          :key="item.id"
          :item="pages[current][i]"
          :index="index(i)"
        />
      </AdminTable>
      <AdminPagination
        :items="pages"
        :links="links"
        :current="current"
        @to="to"
        @next="next"
        @prev="prev"
      />
    </div>
    <div class="admin-events__empty" v-else>
      <p>Текущий список мероприятий пуст.</p>
      <p>
        Для того, чтобы создать новое мероприятие, кликните на кнопку
        «Добавить».
      </p>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useEvents } from '@/use/store/events'
import { usePagination } from '@/use/components/pagination'
import { sortByDate } from '@/utils/sort'

import paginatedList from '@/mixins/paginatedList'

import AdminTable from '@/components/admin/ui/AdminTable'
import AdminEventsItem from '@/components/admin/modules/events/AdminEventsItem'
import AdminPagination from '@/components/admin/ui/AdminPagination'

export default {
  name: 'AdminEventsList',
  components: { AdminPagination, AdminEventsItem, AdminTable },
  mixins: [paginatedList],
  props: {
    sort: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { items } = useEvents()

    const sortedItems = computed(() => {
      if (!items.value || !items.value.length) {
        return []
      }

      let result = items.value.concat()

      if (props.sort === 'created-desc') {
        result = result.reverse()
      }

      if (props.sort === 'date-asc') {
        result = sortByDate(result)
      }

      if (props.sort === 'date-desc') {
        result = sortByDate(result, true)
      }

      return result
    })

    return {
      items,
      ...usePagination(sortedItems, props)
    }
  }
}
</script>

<style lang="scss">
.admin-events {
  th,
  td {
    &:nth-child(2) {
      width: 10%;
      text-align: center;
    }

    &:nth-last-child(-n + 2),
    &:nth-last-child(-n + 1) {
      text-align: center;
      width: 150px;
    }
  }
}
</style>
