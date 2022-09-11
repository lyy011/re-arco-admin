<template>
  <VCharts
    v-if="renderChart"
    :option="options"
    :auto-resize="autoResize"
    :style="{ width, height }"
    ref="vChartsRef"
    autoresize
  />
</template>

<script lang="ts" setup>
import { ref, onActivated, onMounted } from "vue";
import VCharts from "vue-echarts";
// import { useAppStore } from '@/stores';

defineProps({
  options: {
    type: Object,
    default() {
      return {};
    },
  },
  autoResize: {
    type: Boolean,
    default: true,
  },
  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "100%",
  },
});
// const appStore = useAppStore();
// const theme = computed(() => {
//   if (appStore.theme === 'dark') return 'dark';
//   return '';
// });
const renderChart = ref(false);

// wait container expand
onActivated(() => {
  renderChart.value = false;
  setTimeout(() => {
    renderChart.value = true;
  }, 50);
});
onMounted(() => {
  renderChart.value = true;
});
</script>

<style scoped lang="less"></style>
