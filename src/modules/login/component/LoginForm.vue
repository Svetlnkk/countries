<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useRouter } from 'vue-router'

import { useUserStore } from '../../../stores/user'

const router = useRouter()

const userStore = useUserStore()

const validationSchema = yup.object({
  name: yup.string().required('Введите ник'),
  password: yup.string().required('Введите пароль')
})

const initialValues: any = {
  name: '',
  password: ''
}

const { handleSubmit } = useForm({
  initialValues,
  validationSchema
})

const { value: name } = useField<string>('name')

const { value: password } = useField<string>('password')

const onSubmit = handleSubmit((values) => {
  userStore.login(values)
  router.push({ name: 'Countries' })
})
</script>

<template>
  <form class="login-form" @submit="onSubmit">
    <CountryInput :name="'nickName'" :placeholder="'Имя'" v-model="name" :type="'text'" />
    <CountryInput
      :name="'password'"
      :placeholder="'Пароль'"
      v-model="password"
      :type="'password'"
    />
    <button type="submit">Войти</button>
  </form>
</template>

<style scoped lang="scss">
.login-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
