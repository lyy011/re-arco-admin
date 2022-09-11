<template>
  <a-sub-menu
    v-if="element.children && element.children.length !== 0"
    :key="(element.name as string)"
  >
    <template #icon v-if="element.meta?.icon"
      ><component :is="element.meta?.icon"></component
    ></template>
    <template #title>{{ element.meta?.title || "" }}</template>
    <menu-item
      v-for="(cElement, index) in element.children"
      :element="cElement"
      :key="index"
      @item-click="onItemClick"
    ></menu-item>
  </a-sub-menu>
  <a-menu-item
    v-if="!element.children || element.children.length <= 0"
    :key="(element.name as string)"
    @click="onItemClick(element)"
  >
    <template #icon v-if="element.meta?.icon"
      ><component :is="element.meta?.icon"></component
    ></template>
    {{ element.meta?.title || "" }}
  </a-menu-item>
</template>

<script setup lang="ts">
import type { RouteRecordRaw } from "vue-router";
import MenuItem from "./menu-item.vue";

const emit = defineEmits(["itemClick"]);

defineProps<{
  element: RouteRecordRaw;
}>();

const onItemClick = (element: RouteRecordRaw) => {
  emit("itemClick", element);
};
</script>

<style lang="scss" scoped></style>
