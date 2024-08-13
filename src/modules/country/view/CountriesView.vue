<script setup lang="ts">
import { onBeforeMount, ref, onBeforeUnmount, watch } from 'vue'
import { storeToRefs } from 'pinia'
import draggable from 'vuedraggable'

import CountryCard from '../component/CountryCard.vue'
import FilterCountryBlock from '../component/FilterCountryBlock.vue'
import { useCountryStore } from '../country.store'

const countryStore = useCountryStore()
const { localContries: data } = storeToRefs(countryStore)

const page = ref(0)
const loading = ref(0)
const main = ref()
const drag = ref(false)
const search = ref('')
const selectedCountry = ref([])

const handleScroll = async () => {
  if (main.value === undefined) return

  let bottomOfWindow =
    Math.ceil(main.value.scrollTop + main.value.clientHeight) >= main.value.scrollHeight - 1

  if (bottomOfWindow) {
    page.value += 1
    try {
      countryStore.showPage(page.value)
    } catch (error) {
      console.log(error)
    }
  }
}

const handleDelete = () => {
  selectedCountry.value = []
  let interval = setInterval(() => {
    if (loading.value < 100) {
      loading.value += 1
    } else {
      loading.value = 0
      clearInterval(interval)
    }
  }, 10)
}

onBeforeMount(async () => {
  await countryStore.getCountries()
  main.value = document.querySelector('.page-container')
  main.value.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  main.value?.removeEventListener('scroll', handleScroll)
  countryStore.localContries = []
})

watch(
  () => search.value,
  async (newValue) => {
    countryStore.localContries = []
    page.value = 0
    const trim = newValue.trim()
    trim.length === 0
      ? await countryStore.getCountries(page.value)
      : await countryStore.getCountries(page.value, newValue)
  }
)
</script>

<template>
  <div class="countries-header">
    <country-input :name="'search'" :placeholder="'Поиск'" v-model="search" :type="'text'" />
    <button :disabled="selectedCountry.length === 0" @click="handleDelete">Удалить</button>
    <FilterCountryBlock />
  </div>
  <draggable
    v-if="loading === 0"
    class="countries-content"
    v-model="data"
    group="country"
    @start="drag = true"
    @end="drag = false"
    item-key="id"
  >
    <template #item="{ element }">
      <div class="country-container">
        <country-checkbox v-model="selectedCountry" :value="element" />
        <CountryCard :country="element" />
      </div>
    </template>
  </draggable>
  <div class="countries-loader" v-else>
    <country-loader />
  </div>
</template>

<style scoped lang="scss">
.countries-loader {
  display: flex;
  justify-content: center;
}
.country-container {
  display: flex;
  gap: 24px;
  align-items: center;
  justify-content: center;
}
.countries-content {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.countries-header {
  display: flex;
  gap: 16px;
  align-items: center;
}
</style>
