import store from "../store";
import { Notify } from "vant";
import errText from "../utils/errorCode";


const canEnterList = [
                      "/home",
                      "/login",
                      "/register",
                      "/welcome",
                      "/chooseLoginMethod",
                      "/languages",
                      "/agreements/privacy",
                      "/agreements/service",
                      "/companyProfile"
                    ];

export const createRouterGuards = (routers) => {
  routers.beforeEach((to, _from, next) => {
    const { path } = to;
    const token = store.state.user.token;
    const canEnterPath = canEnterList.includes(path);
    // if (!token) {
    //   if (!canEnterPath) {
    //     const lang = store.state.user.lang;
    //     Notify({
    //       type: "warning",
    //       message: errText[lang]['LoginFirst'],
    //       duration: 1000,
    //     });
    //     next("/login");
    //     return;
    //   }
    // }
    next();
  });
};
