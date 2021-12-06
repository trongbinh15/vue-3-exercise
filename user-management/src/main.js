import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { store } from "./store";
import { router } from "./routes";
import Toast, { POSITION } from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

loadFonts();
const toastOptions = {
  // Setting the global default position
  position: POSITION.TOP_RIGHT,
  timeout: 2000
};

createApp(App)
  .use(store)
  .use(router)
  .use(vuetify)
  .use(Toast, toastOptions)
  .mount("#app");
