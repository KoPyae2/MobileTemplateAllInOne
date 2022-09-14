export const other = [

  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login/login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/Login/register.vue"),
  },
  {
    path: "/chooseLoginMethod",
    name: "chooseLoginMethod",
    component: () => import("@/views/Login/chooseLoginType.vue"),
  },
  {
    path: "/languages",
    name: "languages",
    component: () => import("@/views/Home/component/languages.vue"),
  },
  {
    path: "/earning",
    name: "earning",
    component: () => import("@/views/Home/other/earning.vue"),
  },
  {
    path: "/rebate",
    name: "rebate",
    component: () => import("@/views/Home/other/rebate.vue"),
  },
  {
    path: "/signinReward",
    name: "signinReward",
    component: () => import("@/views/Lottery/other/signinReward.vue"),
  },
  {
    path: "/fbLogin",
    name: "fbLogin",
    component: () => import("@/views/Login/fbLogin.vue"),
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404/index.vue"),
  },
  {
    path: "/winningRecord",
    name: "winningRecord",
    component: () => import("@/views/Lottery/other/lotteryRecord.vue"),
  },
];
