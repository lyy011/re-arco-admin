import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
// import { viteMockServe } from "vite-plugin-mock";

import {
  configArcoAutoImport,
  configArcoComponent,
  // configArcoStyles,
} from "./config/plugin/arcoResolver";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/re-arco-admin/",
  plugins: [
    vue(),
    vueJsx(),
    configArcoAutoImport(),
    configArcoComponent(),
    // configArcoStyles(), // 有些组件样式文件没有引入会报错，默认引入全部样式
    // viteMockServe({  // localStorage等方法用不了
    //   mockPath: "src/mock/modules",
    // }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  envDir: "env",
});
