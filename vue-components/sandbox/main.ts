import { createApp } from "vue";
import { UseSupermaticUi } from "@supermatic-ui/vue-core";
import App from "./App.vue";

const app = createApp(App);

app.use(UseSupermaticUi);

app.mount("#app");
