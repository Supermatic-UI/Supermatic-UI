import SupermaticUi from "./components/SupermaticUi.vue";
import SupermaticContainer from "./components/SupermaticContainer.vue";
export { SupermaticUi, SupermaticContainer };
export * from "./setup";
import type { App, Plugin } from "vue";

const components = {
  SupermaticUi,
  SupermaticContainer,
};

export const UseSupermaticUi: Plugin = {
  install: (app: App) => {
    for (let componentKey in components) {
      console.log("install component", componentKey);
      app.component(componentKey, components[componentKey]);
    }
  },
};
