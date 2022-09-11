/**
 * If you use the template method for development, you can use the unplugin-vue-components plugin to enable on-demand loading support.
 * 按需引入
 * https://github.com/antfu/unplugin-vue-components
 * https://arco.design/vue/docs/start
 * Although the Pro project is full of imported components, this plugin will be used by default.
 */
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ArcoResolver } from "unplugin-vue-components/resolvers";
import { createStyleImportPlugin } from "vite-plugin-style-import";

export function configArcoAutoImport() {
  return AutoImport({
    resolvers: [ArcoResolver()],
  });
}

export function configArcoComponent() {
  return Components({
    dirs: [], // Avoid parsing src/components.  避免解析到src/components
    resolvers: [
      ArcoResolver({
        sideEffect: true,
      }),
    ],
  });
}

// 补充在js中调用的组件样式
const styleExclude: string[] = ["layout-footer"];
export function configArcoStyles() {
  return createStyleImportPlugin({
    libs: [
      {
        libraryName: "@arco-design/web-vue",
        esModule: true,
        resolveStyle: (name) => {
          if (styleExclude.includes(name)) return "";
          // css
          return `@arco-design/web-vue/es/${name}/style/css.js`;
          // less
          return `@arco-design/web-vue/es/${name}/style/index.js`;
        },
      },
    ],
  });
}
