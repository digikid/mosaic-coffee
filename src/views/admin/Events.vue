<template>
  <AdminSection id="events" title="Афиша" :pager="hasPager" search>
    <template #toolbar>
      <AdminSort :options="sortOptions" v-model="sort" />
    </template>
    <template #default="{ limit, searchQuery }">
      <AdminEventsList :limit="limit" :searchQuery="searchQuery" :sort="sort" />
    </template>
    <template #actions>
      <AppButton color="green" text="+ Добавить" @click="create" />
    </template>
  </AdminSection>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { useSettings } from '@/use/store/settings'
import { useEvents } from '@/use/store/events'

import AdminSection from '@/components/admin/ui/AdminSection'
import AdminEventsList from '@/components/admin/modules/events/AdminEventsList'
import AppButton from '@/components/ui/AppButton'
import AdminSort from '@/components/admin/ui/AdminSort'
import { pageLimit } from '@/config'

export default {
  name: 'Events',
  components: {
    AppButton,
    AdminEventsList,
    AdminSection,
    AdminSort
  },
  setup() {
    const { items, create } = useEvents()
    const { param, get: getParam, update: updateParam } = useSettings()

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

    const hasPager = computed(() => items.value.length > pageLimit)

    watch(sort, async value => {
      await updateParam({
        ...getParam('ADMIN_EVENTS_SORT_BY_DATE'),
        value
      })
    })

    return {
      create,
      sort,
      sortOptions,
      hasPager
    }
  }
}
</script>
