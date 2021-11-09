<template>
  <div class="admin-socials">
    <div class="admin-socials__list" v-if="items.length">
      <AdminTable
        :headers="['#', 'Лого', 'Название', 'Ссылка', 'Активность', 'Действия']"
      >
        <AdminSocialsItem
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
    <div class="admin-socials__empty" v-else>
      <p>Текущий список соцсетей пуст.</p>
      <p>
        Для того, чтобы создать новую ссылку на соцсеть, кликните на кнопку
        «Добавить».
      </p>
    </div>
  </div>
</template>

<script>
import { useSocials } from '@/use/store/socials'
import { usePagination } from '@/use/components/pagination'

import AdminTable from '@/components/admin/ui/AdminTable'
import AdminSocialsItem from '@/components/admin/modules/socials/AdminSocialsItem'
import AdminPagination from '@/components/admin/ui/AdminPagination'

export default {
  name: 'AdminSocialsList',
  components: { AdminPagination, AdminSocialsItem, AdminTable },
  setup() {
    const { items } = useSocials()

    return {
      items,
      ...usePagination(items)
    }
  }
}
</script>

<style lang="scss">
.admin-socials {
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
