<template>
  <AppForm>
    <div class="form__row">
      <div class="form__col">
        <div class="form__control">
          <label class="form__label">Название</label>
          <input
            type="text"
            class="form__input"
            required
            v-model.trim="item.title"
          />
        </div>
      </div>
      <div class="form__col">
        <div class="form__control">
          <label class="form__label">Место проведения</label>
          <input
            type="text"
            class="form__input"
            required
            v-model.trim="item.place"
          />
        </div>
      </div>
      <div class="form__col">
        <div class="form__row">
          <div class="form__col">
            <div class="form__control">
              <label class="form__label">Цена, от</label>
              <input
                type="number"
                class="form__input"
                required
                v-model.number="item.minPrice"
              />
            </div>
          </div>
          <div class="form__col">
            <div class="form__control">
              <label class="form__label">Цена, до</label>
              <input
                type="number"
                class="form__input"
                v-model.number="item.maxPrice"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="form__col">
        <div class="form__control">
          <label class="form__label">Ссылка на мероприятие</label>
          <input
            type="text"
            class="form__input"
            required
            v-model.trim="item.url"
          />
        </div>
      </div>
      <div class="form__col">
        <div class="form__control">
          <label class="form__label">Дата и время проведения</label>
          <input
            type="text"
            class="form__input"
            required
            readonly="readonly"
            ref="dateInput"
          />
        </div>
      </div>
    </div>
    <div class="form__row">
      <div class="form__col">
        <h3>Постер</h3>
        <AdminTabs>
          <AdminTab title="Указать ссылку" active>
            <p>
              При указании внешней ссылки на изображение оно не будет загружено
              на сервер, поэтому этот способ более предпочтителен.
            </p>
            <p>
              В случае, если одновременно указана ссылка и доступно изображение
              на сервере, приоритет у последнего выше.
            </p>
            <div class="form__control">
              <label class="form__label">Ссылка на изображение</label>
              <input
                type="text"
                class="form__input"
                v-model.trim="item.thumbUrl"
              />
            </div>
          </AdminTab>
          <AdminTab title="Загрузить файл">
            <p>
              Максимальный размер загружаемого файла - 500 Кб, допустимый формат
              изображения - JPEG.
            </p>
            <p>
              Отображение превью аналогично отображению картинки на сайте,
              используйте только подходящие изображения.
            </p>
            <AdminUploader
              silent
              id="events"
              :thumb="item.thumb"
              @uploaded="onThumbUpload"
              @removed="onThumbRemove"
            />
          </AdminTab>
        </AdminTabs>
      </div>
      <div class="form__col">
        <h3>Параметры отображения</h3>
        <p>Настройте видимость и отображение элемента на сайте.</p>
        <div class="form__row">
          <div class="form__col">
            <div class="form__control">
              <AdminSwitcher label="Активно" v-model="item.active" />
            </div>
          </div>
          <div class="form__col">
            <div class="form__control">
              <AdminSwitcher label="Со скидкой" v-model="item.discount" />
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
import AirDatepicker from 'air-datepicker'

import { ref, onMounted } from 'vue'
import { useAdminEditForm } from '@/use/forms/admin/edit'

import { getLocaleDate } from '@/utils/format/date'

import AppForm from '@/components/ui/AppForm'
import AppButton from '@/components/ui/AppButton'
import AdminSwitcher from '@/components/admin/ui/AdminSwitcher'
import AdminUploader from '@/components/admin/ui/AdminUploader'
import AdminTab from '@/components/admin/ui/tabs/AdminTab'
import AdminTabs from '@/components/admin/ui/tabs/AdminTabs'

export default {
  name: 'AdminEventsEdit',
  components: {
    AdminTabs,
    AdminTab,
    AdminUploader,
    AdminSwitcher,
    AppButton,
    AppForm
  },
  setup() {
    const dateInput = ref()

    const { item, ...params } = useAdminEditForm('events')

    onMounted(() => {
      dateInput.value.value = item.value.date
        ? getLocaleDate(item.value.date)
        : null

      new AirDatepicker(dateInput.value, {
        timepicker: true,
        autoClose: true,
        timeFormat: 'hh:mm',
        minutesStep: 15,
        minDate: new Date(),
        dateFormat: date => getLocaleDate(date),
        onSelect({ date }) {
          item.value.date = JSON.stringify(date)
        }
      })
    })

    return {
      item,
      dateInput,
      formatDate: getLocaleDate,
      ...params
    }
  }
}
</script>

<style lang="scss"></style>
