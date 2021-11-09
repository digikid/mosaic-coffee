<template>
  <div class="admin-events">
    <div class="admin-events__list" v-if="items.length">
      <AdminSort :options="sortOptions" v-model="sort" />
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
          :index="i + current * limit"
        />
      </AdminTable>
      <AdminPagination
        :items="pages"
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
import { ref, computed, watch } from 'vue'
import { useEvents } from '@/use/store/events'
import { useSettings } from '@/use/store/settings'
import { usePagination } from '@/use/components/pagination'

import { sortByDate } from '@/utils/sort'

import AdminTable from '@/components/admin/ui/AdminTable'
import AdminEventsItem from '@/components/admin/modules/events/AdminEventsItem'
import AdminPagination from '@/components/admin/ui/AdminPagination'
import AdminSort from '@/components/admin/ui/AdminSort'

export default {
  name: 'AdminEventsList',
  components: { AdminSort, AdminPagination, AdminEventsItem, AdminTable },
  setup() {
    const { items } = useEvents()
    const { param, get: getParam, update: updateParam } = useSettings()

    const sortedItems = computed(() => {
      if (!items.value || !items.value.length) {
        return []
      }

      let result = items.value.concat()

      if (sort.value === 'created-desc') {
        result = result.reverse()
      }

      if (sort.value === 'date-asc') {
        result = sortByDate(result)
      }

      if (sort.value === 'date-desc') {
        result = sortByDate(result, true)
      }

      return result
    })

    const sort = ref(param('ADMIN_EVENTS_SORT_BY_DATE'))

    const sortOptions = ref([
      {
        value: 'created-asc',
        title: 'По дате создания (сначала новые)'
      },
      {
        value: 'created-desc',
        title: 'По дате создания (сначала старые)'
      },
      {
        value: 'date-asc',
        title: 'По дате проведения (сначала новые)'
      },
      {
        value: 'date-desc',
        title: 'По дате проведения (сначала старые)'
      }
    ])

    watch(sort, async value => {
      await updateParam({
        ...getParam('ADMIN_EVENTS_SORT_BY_DATE'),
        value
      })
    })

    return {
      items,
      sort,
      sortOptions,
      ...usePagination(sortedItems)
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
