import { DEFAULT_LAYOUT } from "../base";
import type { RouteRecordRaw } from "vue-router";

const DASHBOARD: RouteRecordRaw = {
  path: "/system",
  name: "system",
  component: DEFAULT_LAYOUT,
  meta: {
    requiresAuth: true,
    icon: "icon-apps",
    title: "系统管理",
    order: 3,
  },
  children: [
    {
      path: "user",
      name: "user",
      component: () => import("@/views/info/article/index.vue"),
      meta: {
        title: "用户管理",
        requiresAuth: true,
        roles: ["*"],
      },
    },
    {
      path: "role",
      name: "role",
      component: () => import("@/views/info/article/index.vue"),
      meta: {
        title: "角色管理",
        requiresAuth: true,
        roles: ["*"],
      },
    },
    {
      path: "column",
      name: "column",
      component: () => import("@/views/info/article/index.vue"),
      meta: {
        title: "栏目管理",
        requiresAuth: true,
        roles: ["*"],
      },
    },
  ],
};

export default DASHBOARD;
