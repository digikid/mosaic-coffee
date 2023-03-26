import { storage } from '@/api/storage'
import { extractStoragePath } from '@//utils/storage'

export const useStorage = () => {
  const isFileExists = async (path, fileName) => {
    const storageRef = storage.ref(path)

    const { items } = await storageRef.listAll()

    let check = false

    for (const imgRef of items) {
      const url = await imgRef.getDownloadURL()

      if (url.includes(fileName)) {
        check = true

        break
      }
    }

    return check
  }

  const upload = async (path, file, onLoading, onSuccess, onError) => {
    try {
      const storageRef = storage.ref(path)
      const task = storageRef.put(file)

      task.on(
        'state_changed',
        snapshot => {
          const { bytesTransferred, totalBytes } = snapshot
          const progress = (100 * bytesTransferred) / totalBytes

          if (typeof onLoading === 'function') {
            onLoading(progress)
          }
        },
        e => {
          if (typeof onError === 'function') {
            onError(e)
          }
        },
        async () => {
          const url = await task.snapshot.ref.getDownloadURL()

          if (typeof onSuccess === 'function') {
            onSuccess(url)
          }
        }
      )
    } catch (e) {
      if (typeof onError === 'function') {
        onError(e)
      }
    }
  }

  const remove = async (path, onSuccess, onError) => {
    const storagePath = extractStoragePath(path)

    try {
      const desertRef = storage.ref(storagePath)

      await desertRef.delete()

      if (typeof onSuccess === 'function') {
        onSuccess()
      }
    } catch (e) {
      if (typeof onError === 'function') {
        onError(e)
      }
    }
  }

  return {
    isFileExists,
    upload,
    remove
  }
}
