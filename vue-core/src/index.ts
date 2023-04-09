import SupermaticUi from './components/sdui-renderer.vue';
import { App } from "vue"

const components = {
    SupermaticUi
}

const install = (app: App, options) => {
    for (let componentKey in components) {
        console.log('install component', componentKey);
        app.component(componentKey, components[componentKey])
    }
}

export default {
    install,
    SupermaticUi
}
