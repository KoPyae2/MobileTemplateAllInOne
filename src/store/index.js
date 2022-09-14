import { createStore } from "vuex";
import user from "./modules/user";
import theme from "./modules/theme";
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  modules: {
    user,
    theme,
  },
  plugins: [
    createPersistedState({
      storage: window.localStorage,
      key: "vuex-user",
      paths: ["user"],
    }),
  ],
});

export default store;
