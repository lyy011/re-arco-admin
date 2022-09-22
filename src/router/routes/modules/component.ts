import { DEFAULT_LAYOUT } from "../base";
import type { RouteRecordRaw } from "vue-router";

const COMPONENT: RouteRecordRaw = {
  path: "/component",
  name: "component",
  component: DEFAULT_LAYOUT,
  meta: {
    requiresAuth: true,
    icon: "icon-robot",
    title: "组件DEMO",
    order: 3,
  },
  children: [
    {
      path: "editor",
      name: "editor",
      component: () => import("@/views/component/editor.vue"),
      meta: {
        title: "富文本编辑",
        requiresAuth: true,
        roles: ["*"],
      },
    }
  ],
};

export default COMPONENT;
