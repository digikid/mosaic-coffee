<template>
  <div class="admin-greetings">
    <div class="admin-greetings__list" v-if="items.length">
      <AdminTable
        :headers="['#', 'Текст приветствия', 'Активность', 'Действия']"
      >
        <AdminGreetingsItem
          v-for="(item, i) in pages[current]"
          :key="item.id"
          :item="pages[current][i]"
          :index="index(i)"
          v-model="lastEditedId"
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
    <div class="admin-greetings__empty" v-else>
      <p>Текущий список приветствий пуст.</p>
      <p>
        Для того, чтобы создать новое приветствие, кликните на кнопку
        «Добавить».
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useGreetings } from '@/use/store/greetings'
import { usePagination } from '@/use/components/pagination'

import AdminTable from '@/components/admin/ui/AdminTable'
import AdminGreetingsItem from '@/components/admin/modules/greetings/AdminGreetingsItem'
import AdminPagination from '@/components/admin/ui/AdminPagination'

export default {
  name: 'AdminGreetingsList',
  components: { AdminPagination, AdminGreetingsItem, AdminTable },
  setup() {
    const { items } = useGreetings()

    const lastEditedId = ref()

    return {
      items,
      lastEditedId,
      ...usePagination(items)
    }
  }
}
</script>

<style lang="scss">
.admin-greetings {
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
