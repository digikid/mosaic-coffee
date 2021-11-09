<template>
  <AppForm>
    <div class="form__row">
      <div class="form__col">
        <div class="form__control">
          <label class="form__label">Тип</label>
          <select v-model="item.category" required>
            <option checked disabled value="">Выберите тип</option>
            <option
              v-for="category in categories"
              :key="category.value"
              :value="category.value"
            >
              {{ category.title }}
            </option>
          </select>
        </div>
      </div>
      <div class="form__col">
        <div class="form__control">
          <label class="form__label">Значение</label>
          <input
            ref="input"
            type="text"
            class="form__input"
            required
            v-model.trim="item.value"
          />
        </div>
      </div>
    </div>
    <div class="form__row">
      <div class="form__col">
        <h3>Параметры отображения</h3>
        <p>Настройте видимость элемента на сайте.</p>
        <div class="form__row">
          <div class="form__col">
            <div class="form__control">
              <AdminSwitcher label="Активно" v-model="item.active" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <AppButton
        text="Сохранить"
        :disabled="!isSaveEnabled"
        @click="onSave(false)"
      />
      <AppButton
        text="Удалить"
        color="red"
        v-show="$route.params.id"
        @click="onRemove"
      />
      <AppButton text="Отменить" color="border" @click="onCancel" />
    </template>
  </AppForm>
</template>

<script>
import { create as mask } from 'maska'

import { ref, watch, onMounted } from 'vue'

import { useContacts } from '@/use/store/contacts'
import { useAdminEditForm } from '@/use/forms/admin/edit'

import AppForm from '@/components/ui/AppForm'
import AppButton from '@/components/ui/AppButton'
import AdminSwitcher from '@/components/admin/ui/AdminSwitcher'

export default {
  name: 'AdminContactsEdit',
  components: {
    AdminSwitcher,
    AppButton,
    AppForm
  },
  setup() {
    const { categories } = useContacts()
    const { item, isSaveEnabled, onSave, onRemove, onCancel } =
      useAdminEditForm('contacts')

    const input = ref()
    const masked = ref()

    watch(
      () => item.value.category,
      value => {
        item.value.value = null

        if (value === 'phone') {
          initMask()
        } else {
          destroyMask()
        }
      }
    )

    onMounted(() => {
      if (item.value.category === 'phone') {
        initMask()
      }
    })

    const initMask = () => {
      masked.value = mask(input.value, {
        mask: '+7 (###) ###-####'
      })
    }

    const destroyMask = () => {
      if (!masked.value) return

      masked.value.destroy()
      masked.value = null
    }

    return {
      item,
      categories,
      input,
      isSaveEnabled,
      onSave,
      onRemove,
      onCancel
    }
  }
}
</script>

<style lang="scss"></style>
