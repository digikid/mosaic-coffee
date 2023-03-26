<template>
  <tr :class="!item.active ? 'is-inactive' : null">
    <td>{{ index + 1 }}</td>
    <td @click.stop="editText(item)">
      <div class="greetings__item">
        <div class="greetings__editor editor" v-if="isEditorEnable(item)">
          <AdminEditor
            v-model="editor.text"
            @keydown="onEditorKeydown($event, item)"
          />
        </div>
        <div class="greetings__content" v-else>
          <p>{{ item.text }}</p>
        </div>
      </div>
    </td>
    <td>
      <AppTimeInput v-model="startTime" @click.stop="editTime(item)" />
    </td>
    <td>
      <AppTimeInput v-model="endTime" @click.stop="editTime(item)" />
    </td>
    <td>
      <AdminSwitcher v-model="activeValue" />
    </td>
    <td>
      <AdminAction
        icon="save"
        v-if="isEditing(item) || isUpdated(item)"
        :disabled="!isUpdated(item)"
        @click="save(item)"
      />
      <AdminAction
        icon="edit"
        v-if="!isEditing(item) && !isUpdated(item)"
        @click.stop="editText(item)"
      />
      <AdminAction icon="remove" @click="remove(item.id)" />
    </td>
  </tr>
</template>

<script>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useGreetings } from '@/use/store/greetings'
import { isCmdEnter } from '@/utils/keyboard'
import { isValidTimeString } from '@/utils/time'

import AppTimeInput from '@/components/ui/AppTimeInput.vue'
import AdminEditor from '@/components/admin/ui/AdminEditor'
import AdminAction from '@/components/admin/ui/AdminAction'
import AdminSwitcher from '@/components/admin/ui/AdminSwitcher'

export default {
  name: 'AdminGreetingsItem',
  components: {
    AppTimeInput,
    AdminSwitcher,
    AdminAction,
    AdminEditor
  },
  emits: ['update:modelValue'],
  props: {
    item: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    modelValue: String
  },
  setup(props, { emit }) {
    const { update, remove } = useGreetings()

    const text = ref(props.item.text || '')
    const startTime = ref(props.item.startTime || '')
    const endTime = ref(props.item.endTime || '')
    const activeValue = ref(props.item.active)

    const isTextUpdated = item => {
      return isEditorEnable(item) && text.value !== item.text
    }

    const isStartTimeUpdated = item => {
      return (
        isValidTime(startTime.value) &&
        startTime.value !== (item.startTime || '')
      )
    }

    const isEndTimeUpdated = item => {
      return (
        isValidTime(endTime.value) && endTime.value !== (item.endTime || '')
      )
    }

    const isUpdated = item => {
      return (
        isTextUpdated(item) ||
        isStartTimeUpdated(item) ||
        isEndTimeUpdated(item)
      )
    }

    const editor = ref({
      id: null,
      text: null
    })

    const isEditing = item => {
      return props.modelValue === item.id
    }

    const isEditorEnable = item => {
      return isEditing(item) && item.id === editor.value.id
    }

    const isValidTime = str => {
      return !str || isValidTimeString(str)
    }

    const enableEdit = item => {
      emit('update:modelValue', item.id)
    }

    const disableEdit = () => {
      emit('update:modelValue', null)
    }

    const enableEditor = item => {
      editor.value.id = item.id
      editor.value.text = item.text
    }

    const disableEditor = () => {
      editor.value.id = null
      editor.value.text = null
    }

    const editText = item => {
      enableEditor(item)
      enableEdit(item)
    }

    const editTime = item => {
      disableEditor()
      enableEdit(item)
    }

    const save = async item => {
      const updated = {}

      if (isTextUpdated(item)) {
        updated.text = text.value
      }

      if (isStartTimeUpdated(item)) {
        updated.startTime = startTime.value
      }

      if (isEndTimeUpdated(item)) {
        updated.endTime = endTime.value
      }

      await update({
        ...item,
        ...updated
      })

      disableEditor()
      disableEdit()
    }

    const onEditorKeydown = (e, item) => {
      if (isCmdEnter(e)) {
        save(item)
      }
    }

    const onClickOutside = () => {
      disableEditor()
      disableEdit()
    }

    watch(
      () => editor.value.text,
      value => {
        text.value = value || ''
      }
    )

    watch(activeValue, async value => {
      const { item } = props

      await update({
        ...item,
        active: value
      })
    })

    onMounted(() => {
      document.addEventListener('click', onClickOutside)
    })

    onUnmounted(() => {
      document.removeEventListener('click', onClickOutside)
    })

    return {
      startTime,
      endTime,
      activeValue,
      editor,
      isUpdated,
      isEditing,
      isEditorEnable,
      editText,
      editTime,
      save,
      remove,
      onEditorKeydown
    }
  }
}
</script>

<style lang="scss">
.greetings {
  &__content {
    cursor: pointer;

    textarea {
      pointer-events: none;
    }
  }
}
</style>
