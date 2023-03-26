import { useToast } from 'vue-toastification'
import { message } from '@/utils/system/message'

export const toast = useToast()

export const success = (code, module = '') =>
  toast.success(message(code, module))

export const error = (code, module = '') => toast.error(message(code, module))

export const warning = (code, module = '') =>
  toast.warning(message(code, module))
