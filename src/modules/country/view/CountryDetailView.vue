<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onBeforeMount, ref, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'
import type { View } from 'ol'

import { useCountryStore } from '../country.store'
import { numberFormat } from '../../../helpers/numberFormat'

const route = useRoute()

const countryStore = useCountryStore()
const { country: data, coordinate: dataCoordinate } = storeToRefs(countryStore)

const countryId = Number(route.params.id)

const view = ref<View>()

onBeforeMount(async () => {
  await countryStore.getCountryDetail(countryId)
})

onBeforeUnmount(() => {
  countryStore.country = undefined
  countryStore.coordinate = []
})
</script>

<template>
  <div class="country-detail" v-if="data">
    <div class="country-detail__name">{{ data.name }}</div>
    <div class="country-detail__description">
      <img :src="data.flag ?? ''" />
      <div class="info">
        <p>Столица: {{ data.capital }}</p>
        <p>Валюта: {{ data.currency }}</p>
        <p>Население: {{ data.population ? numberFormat(data.population) : '' }}</p>
        <p>Площадь: {{ data.land_area ? numberFormat(data.land_area) : '' }}</p>
      </div>
    </div>

    <ol-map
      :load-tiles-while-animating="true"
      :load-tiles-while-interacting="true"
      style="height: 400px"
      v-if="dataCoordinate.length > 0"
    >
      <ol-view ref="view" :center="dataCoordinate" :zoom="6" projection="EPSG:4326" />
      <ol-tile-layer>
        <ol-source-osm />
      </ol-tile-layer>
    </ol-map>
    <div v-else>Карта недоступна</div>
  </div>
</template>

<style scoped lang="scss">
.country-detail {
  display: flex;
  gap: 32px;
  flex-direction: column;
  margin-bottom: 32px;

  &__name {
    font-size: 48px;
    font-weight: 700;
  }

  &__description {
    display: flex;
    gap: 24px;
  }

  .info {
    display: flex;
    gap: 16px;
    flex-direction: column;

    p {
      font-size: 18px;
    }
  }
}
</style>
