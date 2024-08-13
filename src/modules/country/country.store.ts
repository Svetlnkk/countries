import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ICountry } from './country.types'
import coordinates from './coordinates'

export const useCountryStore = defineStore('country', () => {
  const countries = ref<ICountry[]>([])
  const perPage = 20
  const localContries = ref<ICountry[]>([])
  const country = ref<ICountry | undefined>()
  const coordinate = ref<number[]>([])

  const getCountries = async (page?: number, search?: string) => {
    const localSearch = search ?? ''
    const localPage = page ?? 0
    if (localSearch !== '') {
      fetch(`https://freetestapi.com/api/v1/countries?search=${localSearch}`)
        .then((res) => res.json())
        .then((data) => {
          countries.value = data
          showPage(localPage)
        })
        .catch((e) => console.log(e))
      return
    }
    fetch('https://freetestapi.com/api/v1/countries')
      .then((res) => res.json())
      .then((data) => {
        countries.value = data
        showPage(localPage)
      })
      .catch((e) => console.log(e))
  }

  const showPage = (page: number) => {
    const startIndex = page * perPage
    const endIndex = startIndex + perPage

    countries.value.forEach((item, index) => {
      if (index >= startIndex && index < endIndex) {
        localContries.value.push(item)
      }
    })
  }

  const filterCountries = (values: { valueFirst: number; valueSecond: number }) => {
    localContries.value = countries.value.filter(
      (item) => item.population >= values.valueFirst && item.population <= values.valueSecond
    )
  }

  const getCountryDetail = async (id: number) => {
    fetch(`https://freetestapi.com/api/v1/countries/${id}`)
      .then((res) => res.json())
      .then((data) => {
        country.value = data
        if (country.value) {
          const name = country.value?.name
          const findCountry = coordinates.find((item) => item.name === name)
          if (findCountry) {
            coordinate.value.push(findCountry.longitude)
            coordinate.value.push(findCountry.latitude)
          }
        }
      })
      .catch((e) => console.log(e))
  }

  return {
    countries,
    localContries,
    country,
    coordinate,

    getCountries,
    showPage,
    getCountryDetail,
    filterCountries
  }
})
