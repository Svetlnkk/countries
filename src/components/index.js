import CountryLoader from './CountryLoader.vue'
import CountryInput from './CountryInput.vue'
import CountryCheckbox from './CountryCheckbox.vue'

export default function (app) {
  app.component('CountryLoader', CountryLoader)
  app.component('CountryInput', CountryInput)
  app.component('CountryCheckbox', CountryCheckbox)
}
