import SduiButton from './components/sdui-button.vue';
import SduiLabel from './components/sdui-label.vue';
import SduiTetxtInput from './components/sdui-text-input.vue';
import { App } from "vue"

const components = {
    SduiButton,
    SduiLabel,
    SduiTetxtInput
}

const install = (app: App, options) => {
    for (let componentKey in components) {
        console.log('install component', componentKey);
        app.component(componentKey, components[componentKey])
    }
}

export default {
    install,
    SduiButton,
    SduiLabel,
    SduiTetxtInput
}