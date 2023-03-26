<template>
  <h3>Основное</h3>
  <div class="form__row">
    <div class="form__col">
      <AdminParam @update="onUpdate" id="SOCIALS_TITLE" />
    </div>
    <div class="form__col">
      <AdminParam @update="onUpdate" id="SOCIALS_TEXT" />
    </div>
  </div>
  <h3>Заглушка</h3>
  <div class="form__row">
    <div class="form__col">
      <AdminParam @update="onUpdate" id="SOCIALS_EMPTY_TITLE" />
    </div>
    <div class="form__col">
      <AdminParam @update="onUpdate" id="SOCIALS_EMPTY_TEXT" />
    </div>
  </div>
  <h3>Категории</h3>
  <div class="form__row">
    <div class="form__col">
      <AdminParam @update="onUpdate" id="SOCIALS_TITLE_REVIEWS" />
    </div>
    <div class="form__col">
      <AdminParam @update="onUpdate" id="SOCIALS_TITLE_CASHBACK" />
    </div>
    <div class="form__col">
      <AdminParam @update="onUpdate" id="SOCIALS_TITLE_PAGE" />
    </div>
  </div>
  <h3>Параметры отображения</h3>
  <div class="form__row">
    <div class="form__col">
      <AdminParam @update="onUpdate" id="SOCIALS_ACTIVE" />
    </div>
  </div>
  <!--  <h3>Фоновое изображение</h3>-->
  <!--  <div class="form__row">-->
  <!--    <div class="form__col">-->
  <!--      <p>-->
  <!--        Максимальный размер загружаемого файла - 1 Мб, допустимый формат-->
  <!--        изображения - JPEG.-->
  <!--      </p>-->
  <!--      <AdminParam id="SOCIALS_BG" />-->
  <!--    </div>-->
  <!--  </div>-->
</template>

<script>
import AdminParam from '@/components/admin/ui/AdminParam'

export default {
  name: 'AdminSettingsSocials',
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
