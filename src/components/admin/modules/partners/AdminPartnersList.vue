<template>
  <div class="admin-partners">
    <div class="admin-partners__list" v-if="items.length">
      <AdminTable
        :headers="['#', 'Лого', 'Название', 'Ссылка', 'Активность', 'Действия']"
      >
        <AdminPartnersItem
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
    <div class="admin-partners__empty" v-else>
      <p>Текущий список партнеров пуст.</p>
      <p>
        Для того, чтобы создать нового партнера, кликните на кнопку «Добавить».
      </p>
    </div>
  </div>
</template>

<script>
import { usePartners } from '@/use/store/partners'
import { usePagination } from '@/use/components/pagination'

import paginatedList from '@/mixins/paginatedList'

import AdminTable from '@/components/admin/ui/AdminTable'
import AdminPartnersItem from '@/components/admin/modules/partners/AdminPartnersItem'
import AdminPagination from '@/components/admin/ui/AdminPagination'

export default {
  name: 'AdminPartnersList',
  components: { AdminPagination, AdminPartnersItem, AdminTable },
  mixins: [paginatedList],
  setup(props) {
    const { items } = usePartners()

    return {
      items,
      ...usePagination(items, props)
    }
  }
}
</script>

<style lang="scss">
.admin-partners {
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
