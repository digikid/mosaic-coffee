<template>
  <h3>Основное</h3>
  <div class="form__row">
    <div class="form__col">
      <AdminParam @update="onUpdate" id="DELIVERY_TITLE" />
    </div>
    <div class="form__col">
      <AdminParam @update="onUpdate" id="DELIVERY_TEXT" />
    </div>
  </div>
  <h3>Кнопка</h3>
  <div class="form__row">
    <div class="form__col">
      <AdminParam @update="onUpdate" id="DELIVERY_BUTTON_TEXT" />
    </div>
    <div class="form__col">
      <AdminParam @update="onUpdate" id="DELIVERY_BUTTON_URL" />
    </div>
  </div>
  <h3>Параметры отображения</h3>
  <div class="form__row">
    <div class="form__col">
      <AdminParam @update="onUpdate" id="DELIVERY_ACTIVE" />
    </div>
  </div>
  <!--  <h3>Фоновое изображение</h3>-->
  <!--  <div class="form__row">-->
  <!--    <div class="form__col">-->
  <!--      <p>-->
  <!--        Максимальный размер загружаемого файла - 1 Мб, допустимый формат-->
  <!--        изображения - JPEG.-->
  <!--      </p>-->
  <!--      <AdminParam @update="onUpdate" id="DELIVERY_BG" />-->
  <!--    </div>-->
  <!--  </div>-->
</template>

<script>
import AdminParam from '@/components/admin/ui/AdminParam'
export default {
  name: 'AdminSettingsDelivery',
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
