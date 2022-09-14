export const homeRouters = [
  {
    path: "/home",
    name: "Home",
    meta: {
      title: "Home",
      icon: "./images/tabbar/home.png",
      icon_select: "./images/tabbar/home_select.png",
    },
    component: () => import("@/views/Home/index.vue"),
  },
  {
    path: "/order",
    name: "Order",
    meta: {
      title: "Video",
      icon: "./images/tabbar/order.png",
      icon_select: "./images/tabbar/order_select.png",
    },
    component: () => import("@/views/Video/index.vue"),
  },
  {
    path: "/lottery",
    name: "Lottery",
    meta: {
      title: "",
      icon: "./images/tabbar/lottery.png",
      icon_select: "./images/tabbar/lottery_select.png",
    },
    component: () => import("@/views/Lottery/index.vue"),
  },
  {
    path: "/recharge",
    name: "Recharge",
    meta: {
      title: "Recharge",
      icon: "./images/tabbar/recharge.png",
      icon_select: "./images/tabbar/recharge_select.png",
    },
    component: () => import("@/views/Recharge/index.vue"),
  },
  {
    path: "/account",
    name: "Account",
    meta: {
      title: "Mine",
      icon: "./images/tabbar/account.png",
      icon_select: "./images/tabbar/account_select.png",
    },
    component: () => import("@/views/Account/index.vue"),
  },
];

export const homeRoute = {
  path: "/",
  component: () => import("@/layout/Home.vue"),
  redirect: "/home",
  children: [...homeRouters],
};
