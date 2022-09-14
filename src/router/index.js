import { createRouter, createWebHashHistory } from "vue-router";
import { other } from "./modules/other";

import { createRouterGuards } from "./routerGuards";

import { homeRoute } from "./modules/home.js";
export const routes = [
  homeRoute,
  {
    path: "/other",
    component: () => import("@/layout/Default.vue"),
    children: [...other],
  },
  {
    path: "/:patchAll(\\S+)",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHashHistory(""),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

export function setupRouter(app) {
  app.use(router);

  createRouterGuards(router);
}
export default router;
