import { ref, onMounted } from 'vue'
import { toast, success, error } from '@/utils/system/toast'

import { bytesToMbs } from '@/utils/format/size'
import { message } from '@/utils/system/message'

import { useStorage } from '@/use/storage/storage'

export const useUploader = (props, { emit }) => {
  const input = ref()
  const preview = ref()

  const isLoading = ref()
  const progress = ref(0)
  const previewSrc = ref(props.thumb)

  const { isFileExists, upload: uploadFile, remove: removeFile } = useStorage()

  const showLoader = () => {
    isLoading.value = true
  }

  const hideLoader = () => {
    isLoading.value = false
  }

  const edit = () => {
    input.value.click()
  }

  const remove = async (path, silent) => {
    const onSuccess = () => {
      if (!silent && !props.silent) {
        success('UPLOADER_REMOVE_SUCCESS')
      }

      previewSrc.value = null

      emit('removed')
    }

    const onError = () => {
      if (!silent) {
        error('UPLOADER_REMOVE_FAILED')
      }
    }

    await removeFile(path, onSuccess, onError)
  }

  const upload = async file => {
    const path = `${props.id}/${file.name}`

    if (previewSrc.value) {
      await remove(previewSrc.value, true)
    }

    showLoader()

    const onLoading = percents => {
      progress.value = percents
    }

    const onError = () => {
      hideLoader()

      error('UPLOADER_LOADING_FAILED')
    }

    const onSuccess = url => {
      progress.value = 0
      previewSrc.value = url

      hideLoader()

      emit('uploaded', url)

      if (!props.silent) {
        success('UPLOADER_LOADING_SUCCESS')
      }
    }

    await uploadFile(path, file, onLoading, onSuccess, onError)
  }

  const change = e => {
    const selectedFiles = e.target.files

    if (!selectedFiles.length) return

    Array.from(selectedFiles).forEach(async file => {
      if (!file.type.match('image')) return

      const sizeInMb = bytesToMbs(file.size)

      if (sizeInMb > props.maxSize) {
        toast.error(`${message('UPLOADER_IMAGE_SIZE')} ${props.maxSize} Мб.`)

        return
      }

      try {
        const isExists = await isFileExists(props.id, file.name)

        if (isExists) {
          error('UPLOADER_FILE_EXIST')

          hideLoader()
        } else {
          await upload(file)
        }
      } catch (e) {
        hideLoader()

        error('UPLOADER_CONNECTION_FAILED')
      }
    })
  }

  onMounted(() => {
    if (props.accept && Array.isArray(props.accept)) {
      input.value.setAttribute('accept', props.accept.join(','))
    }

    input.value.addEventListener('change', change)
  })

  return {
    input,
    preview,
    progress,
    isLoading,
    previewSrc,
    edit,
    remove
  }
}
