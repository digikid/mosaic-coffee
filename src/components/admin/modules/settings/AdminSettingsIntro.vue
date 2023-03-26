<template>
  <h3>Основное</h3>
  <div class="form__row">
    <div class="form__col">
      <AdminParam @update="onUpdate" id="INTRO_TITLE" />
    </div>
    <div class="form__col">
      <AdminParam @update="onUpdate" id="INTRO_TEXT" />
    </div>
  </div>
  <h3>Кнопка</h3>
  <div class="form__row">
    <div class="form__col">
      <AdminParam @update="onUpdate" id="INTRO_BUTTON_TEXT" />
    </div>
    <div class="form__col">
      <AdminParam @update="onUpdate" id="INTRO_BUTTON_URL" />
    </div>
  </div>
  <h3>Параметры отображения</h3>
  <div class="form__row">
    <div class="form__col">
      <AdminParam @update="onUpdate" id="INTRO_ACTIVE" />
    </div>
  </div>
  <!--  <h3>Фоновое изображение</h3>-->
  <!--  <div class="form__row">-->
  <!--    <div class="form__col">-->
  <!--      <p>-->
  <!--        Максимальный размер загружаемого файла - 1 Мб, допустимый формат-->
  <!--        изображения - JPEG.-->
  <!--      </p>-->
  <!--      <AdminParam @update="onUpdate" id="INTRO_BG" />-->
  <!--    </div>-->
  <!--  </div>-->
</template>

<script>
import AdminParam from '@/components/admin/ui/AdminParam'
export default {
  name: 'AdminSettingsIntro',
  components: { AdminParam },
  emits: ['update'],
  setup(_, { emit }) {
    const onUpdate = param => emit('update', param)

    return {
      onUpdate
    }
  }
}
</script>
