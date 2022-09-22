<!--
 * @Author: Lyy
 * @Date: 2022-09-05 17:14:21
 * @LastEditors: Lyy
 * @LastEditTime: 2022-09-20 16:34:55
 * @Description: 文章详情
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
<script lang="ts">
export default {
  name: "articleDetail",
};
</script>
<style lang="scss" scoped></style>
