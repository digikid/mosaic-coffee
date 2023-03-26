<template>
  <div class="admin-users">
    <div class="admin-users__list" v-if="items.length">
      <AdminTable :headers="['#', 'Аватар', 'Имя', 'Email', 'Действия']">
        <AdminUsersItem
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
    <div class="admin-users__empty" v-else>
      <p>Текущий список партнеров пуст.</p>
      <p>
        Для того, чтобы создать нового партнера, кликните на кнопку «Добавить».
      </p>
    </div>
  </div>
</template>

<script>
import { useUsers } from '@/use/store/users'
import { usePagination } from '@/use/components/pagination'

import paginatedList from '@/mixins/paginatedList'

import AdminTable from '@/components/admin/ui/AdminTable'
import AdminUsersItem from '@/components/admin/modules/users/AdminUsersItem'
import AdminPagination from '@/components/admin/ui/AdminPagination'

export default {
  name: 'AdminUsersList',
  components: { AdminPagination, AdminUsersItem, AdminTable },
  mixins: [paginatedList],
  setup(props) {
    const { items } = useUsers()

    return {
      items,
      ...usePagination(items, props)
    }
  }
}
</script>

<style lang="scss">
.admin-users {
  th,
  td {
    &:nth-child(2) {
      width: 10%;
      text-align: center;
    }

    &:nth-last-child(-n + 1) {
      text-align: center;
      width: 150px;
    }
  }
}
</style>
