<template>
  <AdminSection id="greetings" title="Приветствия" pager search>
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
      <AdminReload v-if="isLoading" />
      <AdminGreetingsList v-else :limit="limit" :searchQuery="searchQuery" />
    </template>
    <template #actions>
      <AppButton color="green" text="+ Добавить" @click="showForm" />
    </template>
  </AdminSection>
</template>

<script>
import { ref } from 'vue'
import { useGreetings } from '@/use/store/greetings'
import { error } from '@/utils/system/toast'

import AdminSection from '@/components/admin/ui/AdminSection'
import AdminGreetingsList from '@/components/admin/modules/greetings/AdminGreetingsList'
import AppButton from '@/components/ui/AppButton'
import AdminGreetingsAdd from '@/components/admin/modules/greetings/AdminGreetingsAdd'
import AdminFileReader from '@/components/admin/ui/AdminFileReader.vue'
import AdminReload from '@/components/admin/ui/AdminReload.vue'

export default {
  name: 'Greetings',
  components: {
    AdminGreetingsAdd,
    AppButton,
    AdminGreetingsList,
    AdminSection,
    AdminFileReader,
    AdminReload
  },
  setup() {
    const { downloadFile, loadFromFile, removeAll } = useGreetings()

    const isFormActive = ref()
    const isLoading = ref(false)

    const showForm = () => {
      isFormActive.value = true
    }

    const hideForm = () => {
      isFormActive.value = false
    }

    const onFileReadSuccess = async data => {
      isLoading.value = true

      try {
        await loadFromFile(data)
      } catch (e) {}

      isLoading.value = false
    }

    const onFileReadError = ({ file, message }) => {
      error(`${file.name}\n${message}`)
    }

    return {
      isLoading,
      isFormActive,
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
