import { createApp } from 'vue'
import { UseSupermaticUi } from '@supermatic-ui/vue-core'
import { UseSupermaticUiComponents } from '@supermatic-ui/vue-components'
import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(router)

app.use(UseSupermaticUi)
app.use(UseSupermaticUiComponents)

app.mount('#app')
