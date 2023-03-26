<template>
  <AppForm>
    <div class="form__row">
      <div class="form__col">
        <div class="form__control">
          <label class="form__label">Имя</label>
          <input
            type="text"
            class="form__input"
            required
            v-model.trim="item.name"
          />
        </div>
      </div>
      <div class="form__col">
        <div class="form__control">
          <label class="form__label">Email</label>
          <input
            type="email"
            class="form__input"
            required
            v-model.trim="item.email"
          />
        </div>
      </div>
      <div class="form__col">
        <div class="form__control">
          <label class="form__label">Пароль</label>
          <input
            type="text"
            class="form__input"
            required
            maxlength="18"
            v-model.trim="item.password"
          />
        </div>
      </div>
    </div>
    <div class="form__row">
      <div class="form__col">
        <h3>Аватар</h3>
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
              id="users"
              :thumb="item.thumb"
              :accept="['.jpg', '.jpeg']"
              @uploaded="onThumbUpload"
              @removed="onThumbRemove"
            />
          </AdminTab>
        </AdminTabs>
      </div>
      <div class="form__col">
        <h3>Права доступа</h3>
        <p>Настройте права доступа для пользователя.</p>
        <AdminPermissionsList :items="item.permissions" />
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
import AdminUploader from '@/components/admin/ui/AdminUploader'
import AdminTab from '@/components/admin/ui/tabs/AdminTab'
import AdminTabs from '@/components/admin/ui/tabs/AdminTabs'
import AdminPermissionsList from '@/components/admin/ui/permissions/AdminPermissionsList'

export default {
  name: 'AdminUsersEdit',
  components: {
    AdminPermissionsList,
    AdminTabs,
    AdminTab,
    AdminUploader,
    AppButton,
    AppForm
  },
  setup() {
    return {
      ...useAdminEditForm('users')
    }
  }
}
</script>
