<template>
  <tr :class="!item.active ? 'is-inactive' : null">
    <td>{{ index + 1 }}</td>
    <td @click.stop="edit(item)">
      <div class="greetings__item">
        <div
          class="greetings__editor editor"
          v-if="item.id === editor.id && item.id === modelValue"
        >
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
      <AdminSwitcher v-model="activeValue" />
    </td>
    <td>
      <AdminAction
        icon="save"
        v-if="modelValue === item.id"
        :disabled="editor.text === item.text"
        @click="save(item)"
      />
      <AdminAction
        icon="edit"
        v-if="modelValue !== item.id"
        @click.stop="edit(item)"
      />
      <AdminAction icon="remove" @click="remove(item.id)" />
    </td>
  </tr>
</template>

<script>
import { ref, watch, onMounted } from 'vue'
import { useGreetings } from '@/use/store/greetings'
import { isCmdEnter } from '@/utils/keyboard'

import AdminEditor from '@/components/admin/ui/AdminEditor'
import AdminAction from '@/components/admin/ui/AdminAction'
import AdminSwitcher from '@/components/admin/ui/AdminSwitcher'

export default {
  name: 'AdminGreetingsItem',
  components: { AdminSwitcher, AdminAction, AdminEditor },
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

    const activeValue = ref(props.item.active)

    const editor = ref({
      id: null,
      text: null
    })

    const enableEditor = item => {
      editor.value.id = item.id
      editor.value.text = item.text

      emit('update:modelValue', item.id)
    }

    const disableEditor = () => {
      editor.value.id = null
      editor.value.text = null

      emit('update:modelValue', null)
    }

    const edit = enableEditor

    const save = async item => {
      await update({
        ...item,
        text: editor.value.text
      })

      disableEditor()
    }

    const onEditorKeydown = (e, item) => {
      if (isCmdEnter(e)) {
        save(item)
      }
    }

    watch(activeValue, async value => {
      const { item } = props

      await update({
        ...item,
        active: value
      })
    })

    onMounted(() => {
      document.addEventListener('click', disableEditor)
    })

    return {
      editor,
      activeValue,
      edit,
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
