<template>
  <h3>Основное</h3>
  <div class="form__row">
    <div class="form__col">
      <AdminParam @update="onUpdate" id="MAIN_TITLE" />
    </div>
    <div class="form__col">
      <AdminParam @update="onUpdate" id="MAIN_COMPANY_TITLE" />
    </div>
  </div>
  <h3>Логотип</h3>
  <div class="form__row">
    <div class="form__col">
      <p>
        Максимальный размер загружаемого файла - 500 Кб, допустимые форматы
        изображения - JPEG, PNG, SVG.
      </p>
      <AdminParam @update="onUpdate" id="MAIN_LOGO" />
    </div>
  </div>
</template>

<script>
import AdminParam from '@/components/admin/ui/AdminParam'

export default {
  name: 'AdminSettingsMain',
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

<style lang="scss"></style>
