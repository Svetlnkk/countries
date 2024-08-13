<script setup lang="ts">
import type { ICountry } from '../country.types'
import { numberFormat } from '../../../helpers/numberFormat'

import { useRouter } from 'vue-router'

const router = useRouter()

interface IProps {
  country: ICountry
}

const props = defineProps<IProps>()
</script>

<template>
  <div
    class="country-card"
    @click="router.push({ name: 'Country', params: { id: props.country.id } })"
  >
    <img :src="country.flag ?? ''" />
    <div class="country-card__info">
      <p>
        Название: <span>{{ country?.name }}</span>
      </p>
      <p>
        Столица: <span>{{ country?.capital }}</span>
      </p>
      <p>
        Валюта: <span>{{ country?.currency }}</span>
      </p>
      <p>
        Популяция: <span>{{ country?.population ? numberFormat(country?.population) : '' }}</span>
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.country-card {
  display: flex;
  gap: 24px;
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  width: auto;
  padding: 16px;
  cursor: pointer;
  border: 1px solid #fcfcfc;

  &:hover {
    border: 1px solid #fe9b00;
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 16px;
    font-size: 18px;
    span {
      font-weight: 600;
    }
  }
}
</style>
