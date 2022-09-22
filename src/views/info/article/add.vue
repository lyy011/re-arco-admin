<!--
 * @Author: Lyy
 * @Date: 2022-09-05 17:14:27
 * @LastEditors: Lyy
 * @LastEditTime: 2022-09-20 16:35:05
 * @Description: 新增文章
-->
<template>
  <div class="page-container">
    <Breadcrumb />
    <a-card
      class="general-card page-main"
      :title="($route.meta.title as string)"
      :loading="loading"
    >
    </a-card>
  </div>
</template>

<script setup lang="ts">
import useLoading from "@/hooks/loading";
const { loading, setLoading } = useLoading(true);
setTimeout(() => {
  setLoading(false);
}, 1000);
</script>
<style lang="scss" scoped></style>
