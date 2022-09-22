import { DEFAULT_LAYOUT } from "../base";
import type { RouteRecordRaw } from "vue-router";

const DASHBOARD: RouteRecordRaw = {
  path: "/info",
  name: "info",
  component: DEFAULT_LAYOUT,
  meta: {
    requiresAuth: true,
    icon: "icon-computer",
    title: "资讯管理",
    order: 2,
  },
  children: [
    {
      path: "article",
      name: "article",
      meta: {
        requiresAuth: true,
        roles: ["*"],
        hideChildrenInMenu: true,
        title: "图文管理",
      },
      redirect: { name: "articleList" },
      children: [
        {
          path: "list",
          name: "articleList",
          component: () => import("@/views/info/article/index.vue"),
          meta: {
            requiresAuth: true,
            activeMenu: "article",
          },
        },
        {
          path: "detail",
          name: "articleDetail",
          meta: {
            requiresAuth: true,
            activeMenu: "article",
            title: "图文详情",
          },
          component: () => import("@/views/info/article/detail.vue"),
        },
        {
          path: "add",
          name: "articleAdd",
          meta: {
            requiresAuth: true,
            activeMenu: "article",
            title: "新增图文",
          },
          component: () => import("@/views/info/article/add.vue"),
        },
      ],
    },
  ],
};

export default DASHBOARD;
