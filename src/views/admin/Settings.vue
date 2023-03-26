<template>
  <AdminSection id="settings" title="Настройки">
    <AppForm>
      <AdminTabs>
        <AdminTab title="Основные" id="main">
          <AdminSettingsMain @update="onUpdate" />
        </AdminTab>
        <AdminTab title="Интро" id="intro">
          <AdminSettingsIntro @update="onUpdate" />
        </AdminTab>
        <AdminTab title="Афиша" id="events">
          <AdminSettingsEvents @update="onUpdate" />
        </AdminTab>
        <AdminTab title="Доставка" id="delivery">
          <AdminSettingsDelivery @update="onUpdate" />
        </AdminTab>
        <AdminTab title="Соцсети" id="socials">
          <AdminSettingsSocials @update="onUpdate" />
        </AdminTab>
        <AdminTab title="Партнеры" id="partners">
          <AdminSettingsPartners @update="onUpdate" />
        </AdminTab>
        <AdminTab title="Дополнительно" id="additional">
          <AdminSettingsAdditional />
        </AdminTab>
      </AdminTabs>
      <template #footer>
        <AppButton
          text="Сохранить"
          :disabled="!isSaveEnabled"
          @click="onSave"
        />
      </template>
    </AppForm>
  </AdminSection>
</template>

<script>
import { ref } from 'vue'
import { useSettings } from '@/use/store/settings'

import AdminSection from '@/components/admin/ui/AdminSection'
import AdminTabs from '@/components/admin/ui/tabs/AdminTabs'
import AdminTab from '@/components/admin/ui/tabs/AdminTab'
import AppForm from '@/components/ui/AppForm'
import AppButton from '@/components/ui/AppButton'
import AdminSettingsMain from '@/components/admin/modules/settings/AdminSettingsMain'
import AdminSettingsIntro from '@/components/admin/modules/settings/AdminSettingsIntro'
import AdminSettingsEvents from '@/components/admin/modules/settings/AdminSettingsEvents'
import AdminSettingsDelivery from '@/components/admin/modules/settings/AdminSettingsDelivery'
import AdminSettingsSocials from '@/components/admin/modules/settings/AdminSettingsSocials'
import AdminSettingsAdditional from '@/components/admin/modules/settings/AdminSettingsAdditional'
import AdminSettingsPartners from '@/components/admin/modules/settings/AdminSettingsPartners'

export default {
  name: 'Settings',
  components: {
    AdminSettingsPartners,
    AdminSettingsAdditional,
    AdminSettingsSocials,
    AdminSettingsDelivery,
    AdminSettingsEvents,
    AdminSettingsIntro,
    AdminSettingsMain,
    AppButton,
    AppForm,
    AdminTab,
    AdminTabs,
    AdminSection
  },
  setup() {
    const isSaveEnabled = ref()
    const { update } = useSettings()

    const updated = ref([])

    const onUpdate = param => {
      const { code, type } = param

      const value = type === 'number' ? Number(param.value) : param.value
      const index = updated.value.findIndex(param => param.code === code)

      if (index >= 0) {
        updated.value[index].value = value
      } else {
        updated.value.push(param)
      }

      isSaveEnabled.value = true
    }

    const onSave = async () => {
      await update(updated.value)

      isSaveEnabled.value = false
    }

    return {
      isSaveEnabled,
      onUpdate,
      onSave
    }
  }
}
</script>
