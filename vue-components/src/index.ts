import SupermaticButton from "./components/SupermaticButton.vue";
import SupermaticLabel from "./components/SupermaticLabel.vue";
import SupermaticInput from "./components/SupermaticInput.vue";
export { SupermaticButton, SupermaticLabel, SupermaticInput };
import type { App, Component, Plugin } from "vue";

const components: Record<string, Component> = {
  SupermaticButton,
  SupermaticLabel,
  SupermaticInput,
};

export const UseSupermaticUiComponents: Plugin = {
  install: (app: App) => {
    for (let componentKey in components) {
      console.log("install component", componentKey);
      app.component(componentKey, components[componentKey]);
    }
  },
};
