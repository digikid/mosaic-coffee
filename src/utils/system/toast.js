import { useToast } from 'vue-toastification'
import { message } from '@/utils/system/message'

export const toast = useToast()

export const success = code => toast.success(message(code))

export const error = code => toast.error(message(code))

export const warning = code => toast.warning(message(code))
