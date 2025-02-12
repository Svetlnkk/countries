import './styles/style.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import useComponents from './components/index.js'

import OpenLayersMap from 'vue3-openlayers'
import 'vue3-openlayers/dist/vue3-openlayers.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(OpenLayersMap)

useComponents(app)

app.mount('#app')
