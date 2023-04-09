import { createApp } from 'vue'
import SupermaticUi from '@supermatic-ui/vue-core'
import App from './App.vue'

const app = createApp(App)

app.use(SupermaticUi)

app.mount('#app')