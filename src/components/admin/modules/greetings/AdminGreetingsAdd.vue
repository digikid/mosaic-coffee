<template>
  <AppForm
    title="Добавить приветствие"
    id="greetings"
    @keydown="onFormKeydown($event)"
  >
    <div class="form__control">
      <textarea
        placeholder="Текст приветствия"
        v-model.trim="item.text"
      ></textarea>
    </div>
    <template #footer>
      <AppButton
        text="Сохранить"
        :disabled="!item.text.length"
        @click="onSubmit"
      />
      <AppButton color="gray" text="Отменить" @click="onCancel" />
    </template>
  </AppForm>
</template>

<script>
import { ref } from 'vue'
import { useGreetings } from '@/use/store/greetings'
import { isCmdEnter } from '@/utils/keyboard'

import AppButton from '@/components/ui/AppButton'
import AppForm from '@/components/ui/AppForm'

export default {
  name: 'AdminGreetingsAdd',
  components: { AppForm, AppButton },
  emits: ['close'],
  setup(_, { emit }) {
    const { empty, add } = useGreetings()

    const item = ref(empty.value)

    const onSubmit = async () => {
      await add(item.value)

      item.value.text = ''

      emit('close')
    }

    const onCancel = () => {
      item.value.text = ''

      emit('close')
    }

    const onFormKeydown = e => {
      if (isCmdEnter(e)) {
        onSubmit()
      }
    }

    return {
      item,
      onSubmit,
      onCancel,
      onFormKeydown
    }
  }
}
</script>

<style lang="scss">
.form--greetings {
  margin-bottom: 42px;

  .btn {
    margin-right: 12px;

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
