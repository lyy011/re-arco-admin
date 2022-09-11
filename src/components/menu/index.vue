<template>
  <a-menu
    v-model:collapsed="collapsed"
    v-model:open-keys="openKeys"
    :show-collapse-button="appStore.device !== 'mobile'"
    :auto-open="false"
    :selected-keys="selectedKey"
    auto-open-selected
    :level-indent="34"
    style="height: 100%"
    :onCollapse="setCollapse"
  >
    <menu-item
      v-for="(element, index) in menuTree"
      :element="element"
      :key="index"
      @item-click="goto"
    ></menu-item>
  </a-menu>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute, useRouter, type RouteRecordRaw } from "vue-router";
import type { RouteMeta } from "vue-router";
import { useAppStore } from "@/stores";
import { listenerRouteChange } from "@/utils/route-listener";
import { openWindow, regexUrl } from "@/utils";
import useMenuTree from "./useMenuTree";
import menuItem from "./components/menu-item.vue";

const appStore = useAppStore();
const router = useRouter();
const route = useRoute();
const { menuTree } = useMenuTree();
const collapsed = computed({
  get() {
    if (appStore.device === "desktop") return appStore.menuCollapse;
    return false;
  },
  set(value: boolean) {
    appStore.updateSettings({ menuCollapse: value });
  },
});

const openKeys = ref<string[]>([]);
const selectedKey = ref<string[]>([]);

const goto = (item: RouteRecordRaw) => {
  // Open external link
  if (regexUrl.test(item.path)) {
    openWindow(item.path);
    selectedKey.value = [item.name as string];
    return;
  }
  // Eliminate external link side effects
  const { hideInMenu, activeMenu } = item.meta as RouteMeta;
  if (route.name === item.name && !hideInMenu && !activeMenu) {
    selectedKey.value = [item.name as string];
    return;
  }
  // Trigger router change
  router.push({
    name: item.name,
  });
};
const findMenuOpenKeys = (name: string) => {
  const result: string[] = [];
  let isFind = false;
  const backtrack = (item: RouteRecordRaw, keys: string[], target: string) => {
    if (item.name === target) {
      isFind = true;
      result.push(...keys, item.name as string);
      return;
    }
    if (item.children?.length) {
      item.children.forEach((el) => {
        backtrack(el, [...keys], target);
      });
    }
  };
  menuTree.value.forEach((el: RouteRecordRaw) => {
    if (isFind) return; // Performance optimization
    backtrack(el, [el.name as string], name);
  });
  return result;
};
listenerRouteChange((newRoute) => {
  const { requiresAuth, activeMenu, hideInMenu } = newRoute.meta;
  if (requiresAuth && (!hideInMenu || activeMenu)) {
    const menuOpenKeys = findMenuOpenKeys(
      (activeMenu || newRoute.name) as string
    );

    const keySet = new Set([...menuOpenKeys, ...openKeys.value]);
    openKeys.value = [...keySet];

    selectedKey.value = [activeMenu || menuOpenKeys[menuOpenKeys.length - 1]];
  }
}, true);
const setCollapse = (val: boolean) => {
  if (appStore.device === "desktop")
    appStore.updateSettings({ menuCollapse: val });
};
</script>

<style lang="scss" scoped></style>
