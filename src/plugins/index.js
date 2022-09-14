import { vantPlugins } from "./vant";
import { VueClipboard } from "@soerenmartius/vue3-clipboard";
export const setupPlugins = (app) => {
  app.use(vantPlugins);
  app.use(VueClipboard);
};
