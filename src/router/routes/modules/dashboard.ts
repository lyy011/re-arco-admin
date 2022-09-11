import { DEFAULT_LAYOUT } from "../base";
import type { RouteRecordRaw } from "vue-router";

const DASHBOARD: RouteRecordRaw = {
  path: "/dashboard",
  name: "Dashboard",
  component: DEFAULT_LAYOUT,
  meta: {
    requiresAuth: true,
    icon: "icon-home",
    order: 1,
    title: "首页",
  },
  children: [
    {
      path: "workplace",
      name: "workplace",
      component: () => import("@/views/dashboard/workplace/index.vue"),
      meta: {
        title: "工作台",
        requiresAuth: true,
        roles: ["*"],
      },
    },
  ],
};

export default DASHBOARD;
