<script setup lang="ts">
import { ref } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

import { useCountryStore } from '../country.store'

const countryStore = useCountryStore()

const validationSchema = yup.object({
  valueFirst: yup
    .number()
    .min(0)
    .nullable()
    .required('Заполните поле')
    .test('', 'От < До', (value, context) => {
      if (value < context.parent.valueSecond) return true
      return false
    }),
  valueSecond: yup
    .number()
    .min(0)
    .nullable()
    .required('Заполните поле')
    .test('', 'От < До', (value, context) => {
      if (value > context.parent.valueFirst) return true
      return false
    })
})

const isClear = ref(false)

const initialValues: any = {
  valueFirst: null,
  valueSecond: null
}

const { handleSubmit, resetForm } = useForm({
  initialValues,
  validationSchema
})

const { value: valueFirst, errorMessage: errorFirst } = useField<number>('valueFirst')
const { value: valueSecond, errorMessage: errorSecond } = useField<number>('valueSecond')

const onSubmit = handleSubmit((values) => {
  countryStore.filterCountries(values)
  isClear.value = true
})

const handleResetForm = async () => {
  resetForm()
  isClear.value = false
  countryStore.localContries = []
  await countryStore.getCountries()
}
</script>

<template>
  <div class="filter-block">
    <span>Фильтр населения</span>
    <form class="filter" @submit="onSubmit">
      <div class="filter__item">
        <span>От:</span>
        <div class="filter__item--group">
          {{ valueFirst }}
          <country-input :name="'valueFirst'" v-model="valueFirst" type="number" />
          <span class="invalid">{{ errorFirst }}</span>
        </div>
      </div>
      <div class="filter__item">
        <span>До:</span>
        <div class="filter__item--group">
          {{ valueSecond }}
          <country-input :name="'valueSecond'" v-model="valueSecond" type="number" />
          <span class="invalid">{{ errorSecond }}</span>
        </div>
      </div>
      <button v-if="!isClear" type="submit">Применить</button>
      <button v-else type="button" @click="handleResetForm">Сбросить</button>
    </form>
  </div>
</template>

<style scoped lang="scss">
.filter-block {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.filter {
  display: flex;
  gap: 32px;
  align-items: center;
  span {
    font-size: 18px;
  }

  &__item {
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;

    &--group {
      display: flex;
      flex-direction: column;
    }
  }
}

.invalid {
  color: var(--error-text-color);
}
</style>
