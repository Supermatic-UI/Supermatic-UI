import SduiButton from "./components/sdui-button.vue";
import SduiLabel from "./components/sdui-label.vue";
import SduiTetxtInput from "./components/sdui-text-input.vue";
export { SduiButton, SduiLabel, SduiTetxtInput };
import type { App, Component, Plugin } from "vue";

const components: Record<string, Component> = {
  SduiButton,
  SduiLabel,
  SduiTetxtInput,
};

export const UseSupermaticUiComponents: Plugin = {
  install: (app: App) => {
    for (let componentKey in components) {
      console.log("install component", componentKey);
      app.component(componentKey, components[componentKey]);
    }
  },
};
