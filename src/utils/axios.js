import axios from "axios";
import store from "@/store";
import router from "@/router/index";
import { Toast, Notify } from "vant";
import { useI18n } from "vue-i18n";
import errText from "./errorCode";

// create an axios instance
const service = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

service.interceptors.request.use(
  (config) => {
    if (store.state.user.token) {
      config.headers = {
        Authorization: store.state.user.token,
        "Accept-Language": store.state.user.langId,
      };
    } else {
      config.headers = {
        "Accept-Language": store.state.user.langId,
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (res) => {
    // console.log("Here is in axios success", res);
    if (res.data.code != 0) {
      const lang = store.state.user.lang;
      if (errText[lang][res.data.code]) {
        Notify({ type: "danger", message: errText[lang][res.data.code] });
      } else {
        Notify({ type: "danger", message: errText[lang][100] });
      }
      if (res.data.code == 412) {
        router.push("/login");
        localStorage.clear();
      }
      return Promise.reject(res.data);
    }
    return res.data;
  },
  (error) => {
    /**
     * Check the token is expire or not
     */
    const JWT = store.state.user.token;
    const jwtPayload = JSON.parse(window.atob(JWT.split(".")[1])); // get jwt payload
    const currentDate = new Date(); //get current date time
    const expDate = new Date(jwtPayload.exp * 1000); //convert exp to date time
    console.log(currentDate >= expDate);
    if (currentDate >= expDate) {
      const lang = store.state.user.lang;
      Notify({
          type: "warning",
          message: errText[lang]['LoginFirst'],
          duration: 1000,
        });
      router.push("/login");
      localStorage.clear();
    }

    const lang = store.state.user.lang;

    console.log("here is in error", error);
    switch (error.response.status) {
      case 412:
        router.push("/login");
        localStorage.clear();
        break;
      case 401:
        router.push("/login");
        localStorage.clear();
        break;
    }
    if (errText[lang][error.response.status]) {
      Notify({ type: "danger", message: errText[lang][100] });
    } else {
      Notify({ type: "danger", message: errText[lang][100] });
    }
    return Promise.reject(error);
  }
);

export default service;
