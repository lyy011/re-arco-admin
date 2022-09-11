<template>
  <a-breadcrumb class="container-breadcrumb">
    <a-breadcrumb-item>
      <icon-apps />
    </a-breadcrumb-item>
    <a-breadcrumb-item v-for="item in defaultItems" :key="item">{{
      item
    }}</a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const defaultItems = ref<string[]>([]);
route.matched.map((o) => {
  if (o.meta && o.meta.title) {
    defaultItems.value.push(o.meta.title);
  }
});
</script>

<style scoped lang="less">
.container-breadcrumb {
  margin: 0 0 16px;
  :deep(.arco-breadcrumb-item) {
    color: rgb(var(--gray-6));
    &:last-child {
      color: rgb(var(--gray-8));
    }
  }
}
</style>
