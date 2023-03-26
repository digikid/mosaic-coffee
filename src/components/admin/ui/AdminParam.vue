<template>
  <div class="admin__param" v-if="param">
    <component
      :is="componentName"
      :title="title"
      :param="param"
      v-model="value"
    />
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useSettings } from '@/use/store/settings'

import AdminParamInput from '@/components/admin/ui/params/AdminParamInput'
import AdminParamNumber from '@/components/admin/ui/params/AdminParamNumber'
import AdminParamSwitcher from '@/components/admin/ui/params/AdminParamSwitcher'
import AdminParamUploader from '@/components/admin/ui/params/AdminParamUploader'

export default {
  name: 'AdminParam',
  components: {
    AdminParamUploader,
    AdminParamSwitcher,
    AdminParamNumber,
    AdminParamInput
  },
  props: {
    id: String
  },
  emits: ['update'],
  setup(props, { emit }) {
    const { get } = useSettings()

    const param = computed(() => get(props.id))

    const componentName = computed(() => {
      const { type } = param.value

      const types = {
        number: 'Number',
        text: 'Input',
        boolean: 'Switcher',
        file: 'Uploader'
      }

      return `AdminParam${types[type] || 'Input'}`
    })

    const title = ref(param.value ? param.value.title : null)
    const value = ref(
      param.value ? param.value.value || param.value.default : null
    )

    watch(value, value => {
      emit('update', {
        ...param.value,
        value
      })
    })

    return {
      param,
      title,
      value,
      componentName
    }
  }
}
</script>
