<template>
  <a-layout class="layout" :class="{ mobile: appStore.hideMenu }">
    <div v-if="navbar" class="layout-navbar">
      <NavBar />
    </div>
    <a-layout>
      <a-layout>
        <a-layout-sider
          v-if="renderMenu"
          v-show="!hideMenu"
          class="layout-sider"
          breakpoint="xl"
          :collapsed="collapsed"
          :collapsible="true"
          :width="menuWidth"
          :style="{ paddingTop: navbar ? '60px' : '' }"
          :hide-trigger="true"
          @collapse="setCollapsed"
        >
          <div class="menu-wrapper">
            <Menu />
          </div>
        </a-layout-sider>
        <a-drawer
          v-if="hideMenu"
          :visible="drawerVisible"
          placement="left"
          :footer="false"
          mask-closable
          :closable="false"
          @cancel="drawerCancel"
          :drawer-style="{ padding: 0 }"
          class="menu-drawer"
          :width="appStore.menuWidth"
        >
          <template #title>
            <div class="left-drawer-box">
              <img class="left-drawer-logo" src="@/assets/logo.svg" alt="" />
              <span class="left-drawer-title">{{ title }}</span>
            </div>
          </template>
          <Menu />
        </a-drawer>
        <a-layout
          class="layout-content"
          id="layout-content"
          :style="paddingStyle"
        >
          <TabBar v-if="appStore.tabBar" />
          <a-layout-content>
            <PageLayout />
          </a-layout-content>
          <Footer v-if="footer" />
        </a-layout>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { ref, computed, watch, provide } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore, useAppStore } from "@/stores";
import NavBar from "@/components/navbar/index.vue";
import Menu from "@/components/menu/index.vue";
import Footer from "@/components/footer/index.vue";
import TabBar from "@/components/tab-bar/index.vue";
import usePermission from "@/hooks/permission";
import useResponsive from "@/hooks/responsive";
import PageLayout from "./page-layout.vue";

const title = import.meta.env.VITE_APP_TITLE;
const appStore = useAppStore();
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
const permission = usePermission();
useResponsive(true);
const navbarHeight = `60px`;
const navbar = computed(() => appStore.navbar);
const renderMenu = computed(() => appStore.menu);
const hideMenu = computed(() => appStore.hideMenu);
const footer = computed(() => appStore.footer);
const menuWidth = computed(() => {
  return appStore.menuCollapse ? 48 : appStore.menuWidth;
});
const collapsed = computed(() => {
  return appStore.menuCollapse;
});
const paddingStyle = computed(() => {
  const paddingLeft =
    renderMenu.value && !hideMenu.value
      ? { paddingLeft: `${menuWidth.value}px` }
      : {};
  const paddingTop = navbar.value ? { paddingTop: navbarHeight } : {};
  return { ...paddingLeft, ...paddingTop };
});
const setCollapsed = (val: boolean) => {
  appStore.updateSettings({ menuCollapse: val });
};
watch(
  () => userStore.role,
  (roleValue) => {
    if (roleValue && !permission.accessRouter(route))
      router.push({ name: "notFound" });
  }
);
const drawerVisible = ref(false);
const drawerCancel = () => {
  drawerVisible.value = false;
};
provide("toggleDrawerMenu", () => {
  drawerVisible.value = !drawerVisible.value;
});
</script>

<style scoped lang="less">
@nav-size-height: 60px;
@layout-max-width: 1100px;

.layout {
  width: 100%;
  height: 100%;
}

.layout-navbar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: @nav-size-height;
}

.layout-sider {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  height: 100%;
  transition: all 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
  // &::after {
  //   position: absolute;
  //   top: 0;
  //   right: -1px;
  //   display: block;
  //   width: 1px;
  //   height: 100%;
  //   background-color: var(--color-border);
  //   content: "";
  // }

  > :deep(.arco-layout-sider-children) {
    overflow-y: hidden;
  }
}

.menu-wrapper {
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
  :deep(.arco-menu) {
    ::-webkit-scrollbar {
      width: 12px;
      height: 4px;
    }

    ::-webkit-scrollbar-thumb {
      border: 4px solid transparent;
      background-clip: padding-box;
      border-radius: 7px;
      background-color: var(--color-text-4);
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: var(--color-text-3);
    }
  }
}

.layout-content {
  min-height: 100vh;
  overflow-y: hidden;
  transition: padding 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
}

.left-drawer {
  &-box {
    display: flex;
    align-items: center;
  }
  &-logo {
    width: 18px;
    height: 18px;
    margin-right: 10px;
    flex-shrink: 0;
  }
  &-title {
    font-size: 14px;
    color: var(--color-text-1);
  }
}
</style>
<style>
.menu-drawer .arco-drawer-body {
  padding: 10px 0;
}
.arco-menu-item:hover {
  background-color: var(--color-fill-1) !important;
}
.arco-menu-light .arco-menu-item.arco-menu-selected {
  background-color: rgba(var(--primary-6), 0.06) !important;
}
</style>
