<template>
  <AdminSection id="greetings" title="Приветствия" :pager="hasPager" search>
    <template #toolbar>
      <AdminFileReader
        :extensions="['.txt']"
        layout="button"
        @success="onFileReadSuccess"
        @error="onFileReadError"
      />
      <AppButton
        text="Выгрузить"
        color="orange"
        icon="download"
        @click="downloadFile"
      />
      <AppButton
        text="Удалить все"
        color="red"
        icon="trash"
        @click="removeAll"
      />
    </template>
    <template #default="{ limit, searchQuery }">
      <Transition name="fade">
        <AdminGreetingsAdd v-if="isFormActive" @close="hideForm" />
      </Transition>
      <AdminGreetingsList :limit="limit" :searchQuery="searchQuery" />
    </template>
    <template #actions>
      <AppButton color="green" text="+ Добавить" @click="showForm" />
    </template>
  </AdminSection>
</template>

<script>
import { ref, computed } from 'vue'
import { useGreetings } from '@/use/store/greetings'
import { error } from '@/utils/system/toast'
import { pageLimit } from '@/config'

import AdminSection from '@/components/admin/ui/AdminSection'
import AdminGreetingsList from '@/components/admin/modules/greetings/AdminGreetingsList'
import AppButton from '@/components/ui/AppButton'
import AdminGreetingsAdd from '@/components/admin/modules/greetings/AdminGreetingsAdd'
import AdminFileReader from '@/components/admin/ui/AdminFileReader.vue'

export default {
  name: 'Greetings',
  components: {
    AdminGreetingsAdd,
    AppButton,
    AdminGreetingsList,
    AdminSection,
    AdminFileReader
  },
  setup() {
    const { items, downloadFile, reloadAll, removeAll } = useGreetings()

    const isFormActive = ref()

    const hasPager = computed(() => items.value.length > pageLimit)

    const showForm = () => {
      isFormActive.value = true
    }

    const hideForm = () => {
      isFormActive.value = false
    }

    const onFileReadSuccess = data => {
      reloadAll(data)
    }

    const onFileReadError = ({ file, message }) => {
      error(`${file.name}\n${message}`)
    }

    return {
      isFormActive,
      hasPager,
      showForm,
      hideForm,
      downloadFile,
      removeAll,
      onFileReadSuccess,
      onFileReadError
    }
  }
}
</script>
