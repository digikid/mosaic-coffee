<template>
  <div class="admin-contacts">
    <div class="admin-contacts__list" v-if="items.length">
      <AdminTable :headers="['#', 'Тип', 'Значение', 'Активность', 'Действия']">
        <AdminContactsItem
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
    <div class="admin-contacts__empty" v-else>
      <p>Текущий список партнеров пуст.</p>
      <p>
        Для того, чтобы создать нового партнера, кликните на кнопку «Добавить».
      </p>
    </div>
  </div>
</template>

<script>
import { useContacts } from '@/use/store/contacts'
import { usePagination } from '@/use/components/pagination'

import paginatedList from '@/mixins/paginatedList'

import AdminTable from '@/components/admin/ui/AdminTable'
import AdminContactsItem from '@/components/admin/modules/contacts/AdminContactsItem'
import AdminPagination from '@/components/admin/ui/AdminPagination'

export default {
  name: 'AdminContactsList',
  components: { AdminPagination, AdminContactsItem, AdminTable },
  mixins: [paginatedList],
  setup(props) {
    const { items } = useContacts()

    return {
      items,
      ...usePagination(items, props)
    }
  }
}
</script>

<style lang="scss">
.admin-contacts {
  th,
  td {
    &:nth-last-child(-n + 2),
    &:nth-last-child(-n + 1) {
      text-align: center;
      width: 150px;
    }
  }
}
</style>
