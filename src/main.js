import { createApp } from "vue";
import App from "./App.vue";
import { setupPlugins } from "./plugins";
import { setupRouter } from "./router";
import store from "./store";
import i18n from "./locales/i18n";
import vue3GoogleLogin from 'vue3-google-login'

const app = createApp(App);

// setupPlugins(app);
setupRouter(app);
app.use(setupPlugins);
app.use(store);
app.use(i18n);
app.use(vue3GoogleLogin, {
  clientId: import.meta.env.VITE_GOOGLE_ID
})


app.mount("#app");
