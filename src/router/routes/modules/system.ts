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
      component: () => import("@/views/system/user/index.vue"),
      meta: {
        title: "用户管理",
        requiresAuth: true,
        roles: ["*"],
      },
    },
    {
      path: "role",
      name: "role",
      component: () => import("@/views/system/role/index.vue"),
      meta: {
        title: "角色管理",
        requiresAuth: true,
        roles: ["*"],
      },
    },
    {
      path: "menu",
      name: "menu",
      component: () => import("@/views/system/menu/index.vue"),
      meta: {
        title: "菜单管理",
        requiresAuth: true,
        roles: ["*"],
      },
    },
    {
      path: "setting",
      name: "setting",
      component: () => import("@/views/system/setting/index.vue"),
      meta: {
        title: "平台设置",
        requiresAuth: true,
        roles: ["*"],
      },
    },
  ],
};

export default DASHBOARD;
