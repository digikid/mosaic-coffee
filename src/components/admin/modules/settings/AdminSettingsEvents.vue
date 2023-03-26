<template>
  <h3>Основное</h3>
  <div class="form__row">
    <div class="form__col">
      <AdminParam @update="onUpdate" id="EVENTS_TITLE" />
    </div>
    <div class="form__col">
      <AdminParam @update="onUpdate" id="EVENTS_TEXT" />
    </div>
  </div>
  <h3>Заглушка</h3>
  <div class="form__row">
    <div class="form__col">
      <AdminParam @update="onUpdate" id="EVENTS_EMPTY_TITLE" />
    </div>
    <div class="form__col">
      <AdminParam @update="onUpdate" id="EVENTS_EMPTY_TEXT" />
    </div>
  </div>
  <h3>Параметры отображения</h3>
  <div class="form__row">
    <div class="form__col">
      <AdminParam @update="onUpdate" id="EVENTS_MAX_COUNT" />
    </div>
  </div>
  <div class="form__row">
    <div class="form__col">
      <AdminParam @update="onUpdate" id="EVENTS_SORT_BY_DATE" />
    </div>
    <div class="form__col">
      <AdminParam @update="onUpdate" id="EVENTS_SHOW_PAST" />
    </div>
    <div class="form__col">
      <AdminParam @update="onUpdate" id="EVENTS_ACTIVE" />
    </div>
  </div>
  <!--  <h3>Фоновое изображение</h3>-->
  <!--  <div class="form__row">-->
  <!--    <div class="form__col">-->
  <!--      <p>-->
  <!--        Максимальный размер загружаемого файла - 1 Мб, допустимый формат-->
  <!--        изображения - JPEG.-->
  <!--      </p>-->
  <!--      <AdminParam @update="onUpdate" id="EVENTS_BG" />-->
  <!--    </div>-->
  <!--  </div>-->
</template>

<script>
import AdminParam from '@/components/admin/ui/AdminParam'

export default {
  name: 'AdminSettingsEvents',
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
