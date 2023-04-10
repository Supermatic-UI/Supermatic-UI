import SupermaticUi from "./components/sdui-renderer.vue";
export { SupermaticUi };
import type { App, Plugin } from "vue";

const components = {
  SupermaticUi,
};

export const UseSupermaticUi: Plugin = {
  install: (app: App) => {
    for (let componentKey in components) {
      console.log("install component", componentKey);
      app.component(componentKey, components[componentKey]);
    }
  },
};
