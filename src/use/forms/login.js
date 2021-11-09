import * as yup from 'yup'

import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useField, useForm, useIsFormDirty, useIsFormValid } from 'vee-validate'
import { useAuth } from '@/use/store/auth'

import { message } from '@/utils/system/message'

export const useLoginForm = () => {
  const initialValues = {
    email: '',
    password: ''
  }

  const route = useRoute()
  const text = computed(() => message(route.query.message))

  const { login } = useAuth()

  const { handleSubmit, resetForm, isSubmitting } = useForm({
    initialValues
  })

  const { value: email, errorMessage: emailError } = useField(
    'email',
    yup
      .string()
      .trim()
      .email(message('LOGIN_INVALID_EMAIL'))
      .required(message('LOGIN_REQUIRED_EMAIL'))
  )

  const { value: password, errorMessage: passwordError } = useField(
    'password',
    yup.string().trim().required(message('LOGIN_REQUIRED_PASSWORD'))
  )

  const onSubmit = handleSubmit(async values => {
    await login(values)
  })

  const isFormValid = useIsFormValid()
  const isFormDirty = useIsFormDirty()

  const isValid = computed(() => isFormValid.value && isFormDirty.value)

  return {
    email,
    emailError,
    password,
    passwordError,
    onSubmit,
    resetForm,
    isSubmitting,
    isValid,
    text
  }
}
