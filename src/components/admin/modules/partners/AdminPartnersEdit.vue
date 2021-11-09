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
          <label class="form__label">Ссылка на сайт</label>
          <input
            type="text"
            class="form__input"
            required
            v-model.trim="item.url"
          />
        </div>
      </div>
    </div>
    <div class="form__row">
      <div class="form__col">
        <h3>Логотип</h3>
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
              Максимальный размер загружаемого файла - 500 Кб, допустимые
              форматы изображения - JPEG, PNG, SVG.
            </p>
            <p>
              Отображение превью аналогично отображению картинки на сайте,
              используйте только подходящие изображения.
            </p>
            <AdminUploader
              silent
              id="partners"
              :thumb="item.thumb"
              :accept="['.jpg', '.jpeg', '.png', '.svg']"
              @uploaded="onThumbUpload"
              @removed="onThumbRemove"
            />
          </AdminTab>
        </AdminTabs>
      </div>
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
import { useAdminEditForm } from '@/use/forms/admin/edit'

import AppForm from '@/components/ui/AppForm'
import AppButton from '@/components/ui/AppButton'
import AdminSwitcher from '@/components/admin/ui/AdminSwitcher'
import AdminUploader from '@/components/admin/ui/AdminUploader'
import AdminTab from '@/components/admin/ui/tabs/AdminTab'
import AdminTabs from '@/components/admin/ui/tabs/AdminTabs'

export default {
  name: 'AdminPartnersEdit',
  components: {
    AdminTabs,
    AdminTab,
    AdminUploader,
    AdminSwitcher,
    AppButton,
    AppForm
  },
  setup() {
    return {
      ...useAdminEditForm('partners')
    }
  }
}
</script>

<style lang="scss"></style>
