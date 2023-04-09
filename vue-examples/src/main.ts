import { createApp } from 'vue'
import SupermaticUi from '@supermatic-ui/vue-core'
import SupermaticUiComponents from '@supermatic-ui/vue-components'
import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(router)

app.use(SupermaticUi)
app.use(SupermaticUiComponents)

app.mount('#app')
