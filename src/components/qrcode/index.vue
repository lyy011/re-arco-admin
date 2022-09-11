<script setup lang="ts">
import { nextTick, ref, watch } from "vue";
import QRCode from "qrcode";

const props = withDefaults(
  defineProps<{
    url: string;
  }>(),
  {
    url: "",
  }
);
const qrcodeCanvasRef = ref();

watch(
  () => props.url,
  (newValue) => {
    if (newValue) {
      nextTick(() => {
        QRCode.toCanvas(
          qrcodeCanvasRef.value,
          newValue,
          {
            margin: 2,
            width: qrcodeCanvasRef.value.offsetWidth,
          },
          (error) => {
            if (error) console.log(error);
          }
        );
      });
    }
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <div class="qrcode-box">
    <canvas ref="qrcodeCanvasRef" class="qrcode-canvas"></canvas>
  </div>
</template>

<style lang="less" scoped>
.qrcode-canvas {
  width: 100%;
  height: 100%;
  vertical-align: bottom;
}
</style>
