<template>
  <router-view v-slot="{ Component, route }">
    <transition name="page-fade" mode="out-in" appear>
      <!-- cacheList 路由配置的名称要和页面的name一致才能缓存 -->
      <keep-alive v-if="!route.meta.ignoreCache" :include="cacheList">
        <component :is="Component" :key="route.fullPath"></component>
      </keep-alive>
      <component :is="Component" v-else :key="route.fullPath"></component>
    </transition>
  </router-view>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useTabBarStore } from "@/stores";

const tabBarStore = useTabBarStore();

const cacheList = computed(() => tabBarStore.getCacheList);
</script>

<style scoped lang="less"></style>
