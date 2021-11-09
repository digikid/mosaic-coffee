<template>
  <AppSection id="greetings" title="Приветствия">
    <Transition name="fade">
      <AdminGreetingsAdd v-if="isFormActive" @close="hideForm" />
    </Transition>
    <AdminGreetingsList />
    <template #actions>
      <AppButton color="green" text="+ Добавить" @click="showForm" />
    </template>
  </AppSection>
</template>

<script>
import { ref } from 'vue'

import AppSection from '@/components/ui/AppSection'
import AdminGreetingsList from '@/components/admin/modules/greetings/AdminGreetingsList'
import AppButton from '@/components/ui/AppButton'
import AdminGreetingsAdd from '@/components/admin/modules/greetings/AdminGreetingsAdd'

export default {
  name: 'Greetings',
  components: { AdminGreetingsAdd, AppButton, AdminGreetingsList, AppSection },
  setup() {
    const isFormActive = ref()

    const showForm = () => {
      isFormActive.value = true
    }

    const hideForm = () => {
      isFormActive.value = false
    }

    return {
      isFormActive,
      showForm,
      hideForm
    }
  }
}
</script>

<style lang="scss"></style>
